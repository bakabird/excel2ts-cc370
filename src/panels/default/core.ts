import * as nodeXlsx from 'node-xlsx';
import chokidar, { FSWatcher } from "chokidar";
import path from "path";
import * as fs from 'fs-extra';
const uglifyJs = require("uglify-js")

type ExcelCache = Record<string, {
    name: string;
    data: any[];
}[]>

const CONST = {
    TYPENUM_PREFIX: "wqidhd98213uhj89wqe",
    TYPENUM_SUFFIX: "s8j12893u8912ue8912",
}

export default class ExcelDealreCore {
    private rawExcelRootPath: string = "";
    private _lastWatch: chokidar.FSWatcher | undefined;
    private _onAddLog: undefined | ((log: string) => void)
    private _onUpdateExcelSheetArray: undefined | ((arr: any[]) => void)

    constructor() {
        console.log('ExcelDealreCore');
    }

    watch(excelRootPath: string,
        onAddLog?: (log: string) => void,
        onUpdateExcelSheetArray?: (arr: any[]) => void) {
        this.rawExcelRootPath = excelRootPath;
        this._onAddLog = onAddLog;
        this._onUpdateExcelSheetArray = onUpdateExcelSheetArray;
        this._lastWatch?.removeAllListeners()
        this._lastWatch = chokidar.watch(this.rawExcelRootPath)
        this._lastWatch.on('all', this._watchDir.bind(this));
        this._onAddLog?.("watch " + excelRootPath);
    }

    _watchDir(event: string, filePath: string) {
        this._onAddLog?.("_watchDir " + filePath);
        let ext = path.extname(filePath);
        if (ext === ".xlsx" || ext === ".xls") {
            const sheetArray = this._onAnalyzeExcelDirPath(this.rawExcelRootPath);
            this._onUpdateExcelSheetArray?.(sheetArray)
        }
    }

    // 查找出目录下的所有excel文件
    _onAnalyzeExcelDirPath(dir: string) {
        if (dir) {
            let self = this;
            // 查找json文件
            let allFileArr: string[] = [];
            let excelFileArr: string[] = [];
            // 获取目录下所有的文件
            readDirSync(dir);
            // 过滤出来.xlsx的文件
            for (let k in allFileArr) {
                let file = allFileArr[k];
                let extName = path.extname(file);
                if (extName === ".xlsx" || extName === ".xls") {
                    excelFileArr.push(file);
                } else {
                    self._onAddLog?.("不支持的文件类型：" + file);
                }
            }
            // 组装显示的数据  
            let excelSheetArray = [];
            self._onAddLog?.("检测到excel文件数量:" + excelFileArr.length);
            for (let k in excelFileArr) {
                let itemFullPath = excelFileArr[k];
                let path1 = itemFullPath.substr(dir.length + 1, itemFullPath.length - dir.length);
                let excelData = nodeXlsx.parse(itemFullPath);
                for (let sheetKey in excelData) {
                    let itemData = {
                        isUse: true,
                        fullPath: itemFullPath,
                        name: path1.substr(0, path1.indexOf(".")),
                        sheet: excelData[sheetKey].name
                    };
                    if (excelData[sheetKey].data.length === 0) {
                        self._onAddLog?.("[Error] 空Sheet: " + itemData.name + " - " + itemData.sheet)
                        continue;
                    }
                    excelSheetArray.push(itemData);
                }
            }
            function readDirSync(dirPath: string) {
                let dirInfo = fs.readdirSync(dirPath);
                for (let i = 0; i < dirInfo.length; i++) {
                    let item = dirInfo[i];
                    let itemFullPath = path.join(dirPath, item);
                    let info = fs.statSync(itemFullPath);
                    if (info.isDirectory()) {
                        // this._addLog('dir: ' + itemFullPath);
                        readDirSync(itemFullPath);
                    } else if (info.isFile()) {
                        let headStr = item.substr(0, 2);
                        if (headStr === "~$") {
                            self._onAddLog?.("检索到excel产生的临时文件:" + itemFullPath);
                        } else {
                            allFileArr.push(itemFullPath);
                        }
                        // this._addLog('file: ' + itemFullPath);
                    }
                }
            }
            return excelSheetArray;
        }
        return [];
    }

    gen(excelSheetArray: any[], isCompressJs: boolean, managerTemplate?: string) {
        let excelCache: ExcelCache = {};
        for (let k = 0; k < excelSheetArray.length; k++) {
            let itemSheet = excelSheetArray[k];
            if (itemSheet.isUse) {
                let excelData = excelCache[itemSheet.fullPath];
                if (!excelData) {
                    excelData = nodeXlsx.parse(itemSheet.fullPath);
                    excelCache[itemSheet.fullPath] = excelData;
                }
            } else {
                console.log("忽略配置: " + itemSheet.fullPath + ' - ' + itemSheet.sheet);
            }
        }
        return {
            //添加ts 类型
            typeInterface: this._genTypeInter(excelCache),
            //添加dataManager定义
            dataManager: managerTemplate ? this._genManager(excelCache, managerTemplate) : "",
            datas: this._genDatas(excelCache, isCompressJs),
        }

    }
    /**
     * 
     * @param {*} excelData 
     * @param {*} itemSheet 
     * 定义 ts接口类型
     */
    _genTypeInter(excelCache: ExcelCache) {
        let typeStr = "";
        let typeEnum = ["string", "number", "list<string>", "list<number>"];
        Object.getOwnPropertyNames(excelCache).forEach(key => {
            excelCache[key].forEach(sheetData => {
                if (sheetData.data.length < 4) {
                    this._onAddLog?.(`表 ${key}--sheet ${sheetData.name} 行数小于3行,跳过`);
                    return;
                }
                let title = sheetData.data[0];  //
                let desc = sheetData.data[1];  //注释  描述
                let type = sheetData.data[2];  //类型,
                let sheetName = sheetData.name.match(/[^<]*\w+(?=>)*/)![0];
                typeStr += `export interface ${sheetName}Data{`
                for (let i = 0; i < type.length; i++) {
                    let varName = title[i];
                    let columDesc: string[] = desc[i].split("\n");
                    let columType = type[i];
                    const enumType = columType.match(/[^()]\w+(?=\))/)
                    if (typeEnum.includes(columType) || enumType) {
                        typeStr += "\n";
                        if (columDesc.length < 2) {
                            typeStr += `/** ${columDesc} */`
                        } else {
                            typeStr += `/**\n` + columDesc.map(l => "\t * " + l).join("\n") + "\n\t */"
                        }
                        typeStr += "\n";
                        typeStr += `${varName}:`
                        if (!enumType) {
                            // columDesc == undefined ? "\n" : "//" + columDesc + "\n";
                            switch (columType) {
                                case "string":
                                    typeStr += `string;`;
                                    break;
                                case "number":
                                    typeStr += `number;`;
                                    break;
                                case "list<number>":
                                    typeStr += `Array<number>;`;
                                    break;
                                case "list<string>":
                                    typeStr += `Array<string>;`;
                                    break;
                            }
                        } else {
                            typeStr += enumType[0];
                        }
                    } else {
                        this._onAddLog?.("[Error] 发现空单元格type:" + key + ":" + columType + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                    }
                }
                typeStr += `};\n`;
            })
        });
        return typeStr;
    }
    _genDatas(excelCache: ExcelCache, isCompressJs: boolean) {
        let saveStr = "";
        let jsSaveData: any = {};
        Object.getOwnPropertyNames(excelCache).forEach(key => {
            // 保存为ts
            excelCache[key].forEach(sheetData => {
                if (sheetData.data.length > 3) {
                    // let attrName=sheetData.data[0];
                    //去掉中文部分  格式: 你好<hello>
                    let cloumMap: any = {};
                    //这里保存sheet字段得长度,因为后面可能出现因为空列而不计入列循环得情况,导致生成得数据直接没了字段
                    let attrLength = sheetData.data[0].length;
                    for (let i = 3; i < sheetData.data.length; i++) {
                        let keyMap: Record<string, any> = {};
                        //有可能出现id为空的情况(可能是完全的空行)
                        if (sheetData.data[i][0] == null || sheetData.data[i][0] == undefined) {
                            continue;
                        }
                        for (let j = 0; j < attrLength; j++) {
                            let key = sheetData.data[0][j];
                            let value = sheetData.data[i][j];
                            if (value !== undefined) {
                                let type = sheetData.data[2][j];
                                let typeArray = type.match(/[^<]\w+(?=>)/);
                                let typeEnum = type.match(/[^()]\w+(?=\))/)
                                if (typeArray) {
                                    // number list
                                    value = (value + "").split(",");
                                    if (typeArray[0] === "number") {
                                        value = (value as Array<any>).reduce((pre, cur) => {
                                            pre.push(Number(cur));
                                            return pre;
                                        }, []);
                                    }
                                } else if (typeEnum) {
                                    // enum
                                    value = CONST.TYPENUM_PREFIX + typeEnum[0] + "." + value + CONST.TYPENUM_SUFFIX;
                                } else if (type === "number") {
                                    value = Number(value);
                                } else if (type === "string") {
                                    value = value + "";
                                } else {
                                    this._onAddLog?.("[Error] 发现空单元格type:" + sheetData.name + ":" + type + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                                }
                            } else {
                                value = null;
                            }
                            keyMap[key] = value;
                        }
                        //用id做键值
                        cloumMap[sheetData.data[i][0]] = keyMap;
                    }
                    //去掉sheetName中文部分
                    let matchRlt = sheetData.name.match(/[^<]*\w+(?=>)*/);
                    if (!matchRlt) throw `sheetDataName ${sheetData.name} matchRlt is null`
                    let sheetName = matchRlt[0];
                    jsSaveData[sheetName] = cloumMap;
                } else {
                    this._onAddLog?.("行数低于3行,无效sheet:" + sheetData.name);
                }
            });
        });

        saveStr += JSON.stringify(jsSaveData)
        let ret = uglifyJs.minify(uglifyJs.parse(saveStr), {
            output: {
                beautify: !isCompressJs,//如果希望得到格式化的输出，传入true
                indent_start: 0,//（仅当beautify为true时有效） - 初始缩进空格
                indent_level: 4,//（仅当beautify为true时有效） - 缩进级别，空格数量
            }
        });
        if (ret.error) {
            this._onAddLog?.('error: ' + ret.error.message);
            return "";
        } else if (ret.code) {
            const finalTxt = ret.code.replaceAll(`"` + CONST.TYPENUM_PREFIX, "").replaceAll(CONST.TYPENUM_SUFFIX + `"`, "");
            return finalTxt;
        }
    }

    _genManager(excelCache: ExcelCache, tempalte: string) {
        let importContent = "";
        let defindContent = "";
        let funcContent = "";
        Object.getOwnPropertyNames(excelCache).forEach(key => {
            excelCache[key].forEach(sheetData => {
                if (sheetData.data.length < 4) {
                    this._onAddLog?.(`表 ${key}--sheet ${sheetData.name} 行数小于3行,跳过`);
                    return;
                }

                let idType = sheetData.data[2][0];  //id的类型
                //去掉sheetName中文部分
                let matchRlt = sheetData.name.match(/[^<]*\w+(?=>)*/);
                if (!matchRlt) {
                    throw Error(sheetData.name + " matchRlt is Null");
                }
                let sheetName = matchRlt[0];

                //添加import内容------------
                importContent += `import {${sheetName}Data} from "./ConfigTypeDefind";\n`;
                defindContent += `public static ${sheetName}DatasArray: Array<${sheetName}Data>;\n`;
                defindContent += `public static ${sheetName}DatasById: { [key in ${idType}]: ${sheetName}Data };\n`;
                funcContent += `        this.${sheetName}DatasArray = this._arrayData("${sheetName}", datas);\n`;
                funcContent += `        this.${sheetName}DatasById = datas["${sheetName}"];\n`;
            });
        });
        tempalte = tempalte.replace("@@import", importContent);
        tempalte = tempalte.replace("@@varDefined", defindContent);
        tempalte = tempalte.replace("@@funcContent", funcContent);
        //  let beautifier = new TsBeautifier();
        let result = tempalte; // beautifier.Beautify(clazData);
        return result;
    }
}