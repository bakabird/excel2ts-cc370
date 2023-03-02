import { TsBeautifier } from '@brandless/tsbeautify';
import chokidar from "chokidar";
import * as fs from 'fs-extra';
import * as nodeXlsx from 'node-xlsx';
import path from 'path';
import { App, createApp, ref } from 'vue';
import CfgUtil from '../../CfgUtil';
const uglifyJs = require("uglify-js")

type ExcelCache = Record<string, {
    name: string;
    data: any[];
}[]>
const join = path.join;
const joinPack = (...arg: string[]) => {
    return join(__dirname, '../../../', ...arg);
}
const panelDataMap = new WeakMap<any, App>();
const CONST = {
    TYPENUM_PREFIX: "wqidhd98213uhj89wqe",
    TYPENUM_SUFFIX: "s8j12893u8912ue8912",
}
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: fs.readFileSync(joinPack("static/template/default/index.html"), 'utf-8'),
    style: fs.readFileSync(joinPack('static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
        logTextArea: '#logTextArea',
    },
    methods: {
        // hello() {
        // if (this.$.text) {
        //     this.$.text.innerHTML = 'hello';
        //     console.log('[cocos-panel-html.default]: hello');
        // }
        // },
    },
    ready() {
        let logCtrl = this.$.logTextArea as any;
        let logListScrollToBottom = function () {
            setTimeout(function () {
                logCtrl.scrollTop = logCtrl.scrollHeight;
            }, 10);
        };
        const app = createApp({});
        app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
        app.component('excel-item', {
            props: ['data', 'index'],
            template: fs.readFileSync(joinPack('static/template/vue/excelItem.html'), 'utf-8'),
            methods: {
                onBtnClickUse() {
                    this.data.isUse = !this.data.isUse;
                    console.log("on use: " + this.data.isUse);
                }
            },
        })
        app.component('MyApp', {
            template: fs.readFileSync(joinPack('static/template/vue/app.html'), 'utf-8'),
            setup() {
                const tsDir = ref(0);
                const excelDir = ref(0);
                // 返回值会暴露给模板和其他的选项式 API 钩子
                return {
                    tsDir,
                    excelDir,
                }
            },
            data() {
                return {
                    logView: "",
                    excelRootPath: "project://",
                    configPath: "project://",
                    isCompressJs: false,  //是否将数据文件打包成json
                    excelArray: [],
                    excelFileArr: [],
                }
            },
            mounted() {
                this._initPluginCfg();
            },
            computed: {
                rawConfigPath() {
                    return Editor.UI.File.resolveToRaw(this.configPath);
                },
                rawExcelRootPath() {
                    if (this.excelRootPath) {
                        return Editor.UI.File.resolveToRaw(this.excelRootPath);
                    } else {
                        return null;
                    }
                },
            },
            watch: {
                // 侦听根级属性
                logView(val, oldVal) {
                    logCtrl.value = val;
                }
            },
            methods: {
                _addLog(str: string) {
                    let time = new Date();
                    this.logView += "[" + time.toLocaleString() + "]: " + str + "\n";
                    logListScrollToBottom();
                },

                _watchDir(event: string, filePath: string) {
                    console.log(event)
                    let ext = path.extname(filePath);
                    if (ext === ".xlsx" || ext === ".xls") {
                        this._onAnalyzeExcelDirPath(this.rawExcelRootPath);
                    }
                },

                _initPluginCfg() {
                    CfgUtil.initCfg((data) => {
                        this.tsDir.protocol = "project"
                        this.excelDir.protocol = "project"
                        if (data) {
                            this.excelRootPath = data.excelRootPath;
                            this.configPath = data.configPath || "project://";
                            this.isCompressJs = data.isCompressJs || false;
                            console.log(this.excelRootPath)
                            console.log(this.rawExcelRootPath)
                            if (this.excelRootPath && fs.existsSync(this.rawExcelRootPath)) {
                                this._addLog(`检测并监视文件夹-----${this.rawExcelRootPath}`);
                                chokidar.watch(this.rawExcelRootPath).on('all', this._watchDir.bind(this));
                            }

                            this.tsDir.value = this.configPath;
                            this.excelDir.value = this.excelRootPath;
                        }
                    });
                },
                onConfirmConfigPath(dir: string) {
                    console.log("confirm config path: " + dir);
                    this.configPath = dir;
                    CfgUtil.saveCfgByData({ configPath: this.configPath });
                },
                onConfirmExcelRootPath(dir: string) {
                    console.log("confirm excel root path: " + dir);
                    this.excelRootPath = dir;
                    CfgUtil.saveCfgByData({ excelRootPath: this.excelRootPath });
                    this._addLog(`改动成功,检测并监视文件夹-----${this.rawExcelRootPath}`);
                    chokidar.watch(this.rawExcelRootPath).on('all', this._watchDir.bind(this));
                },
                onConfirmCompressJs(event: any) {
                    console.log("onBtnIsCompressJsCheck " + event.target.value);
                    this.isCompressJs = event.target.value;
                    CfgUtil.saveCfgByData({ isCompressJs: this.isCompressJs });
                },

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
                                this._addLog("不支持的文件类型: " + file);
                            }
                        }
                        // 组装显示的数据  
                        let excelSheetArray = [];
                        this._addLog("检测到excel文件数量:" + excelFileArr.length);
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
                                    this._addLog("[Error] 空Sheet: " + itemData.name + " - " + itemData.sheet);
                                    continue;
                                }
                                excelSheetArray.push(itemData);
                            }
                        }
                        this.excelArray = excelSheetArray;
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
                                        self._addLog("检索到excel产生的临时文件:" + itemFullPath);
                                    } else {
                                        allFileArr.push(itemFullPath);
                                    }
                                    // this._addLog('file: ' + itemFullPath);
                                }
                            }
                        }
                    }
                },
                onBtnClickSelectSheet(event: any) {
                    let b = event.currentTarget.value;
                    console.log("onBtnClickSelectSheet " + b);
                    for (let k in this.excelArray) {
                        this.excelArray[k].isUse = b;
                    }
                },

                /**
                 * 
                 * @param {*} excelData 
                 * @param {*} itemSheet 
                 * 定义 ts接口类型
                 */
                _saveTypeInter(excelCache: ExcelCache) {
                    let typeStr = "";
                    let typeEnum = ["string", "number", "list<string>", "list<number>"];
                    Object.getOwnPropertyNames(excelCache).forEach(key => {
                        excelCache[key].forEach(sheetData => {
                            if (sheetData.data.length < 4) {
                                this._addLog(`表 ${key}--sheet ${sheetData.name} 行数小于3行,跳过`);
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
                                    this._addLog("[Error] 发现空单元格type:" + key + ":" + columType + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                                }
                            }
                            typeStr += `};\n`;
                        })
                    });
                    //todo 
                    let beautifier = new TsBeautifier();
                    let result = beautifier.Beautify(typeStr)!;
                    fs.writeFileSync(path.join(this.rawConfigPath, "ConfigTypeDefind.ts"), result);
                    return typeStr;
                },
                // 生成配置
                onBtnClickGen() {
                    // 参数校验
                    if (this.excelArray.length <= 0) {
                        this._addLog("未发现要生成的配置!");
                        return;
                    }
                    this.logView = "";
                    // 删除老的配置
                    // fs.emptyDirSync(this.rawConfigPath);
                    // let jsSaveData = {};// 保存的js数据
                    this._addLog("excel 数量:" + this.excelArray.length);
                    //选取第一个sheet
                    let excelCache: ExcelCache = {};
                    for (let k = 0; k < this.excelArray.length; k++) {
                        let itemSheet = this.excelArray[k];
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
                    //添加ts 类型
                    this._saveTypeInter(excelCache);
                    //添加dataManager定义
                    this.addAsType(excelCache);
                    this.addMainDatas(excelCache);
                    // let saveStr = "export let  datas =  " +  JSON.stringify(jsSaveData) + ";";
                    this._addLog("全部转换完成!");
                },
                addMainDatas(excelCache: ExcelCache) {
                    let saveStr = "export default ";
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
                                            } else if (type.match(/[^(]\w+(?=))/)) {
                                                this._addLog("[Error] 发现空单元格type:" + sheetData.name + ":" + type + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
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
                                this._addLog("行数低于3行,无效sheet:" + sheetData.name);
                            }
                        });
                    });
                    let saveFileFullPath = path.join(this.rawConfigPath, "Config.ts");
                    saveStr += JSON.stringify(jsSaveData)
                    let ret = uglifyJs.minify(uglifyJs.parse(saveStr), {
                        output: {
                            beautify: !this.isCompressJs,//如果希望得到格式化的输出，传入true
                            indent_start: 0,//（仅当beautify为true时有效） - 初始缩进空格
                            indent_level: 4,//（仅当beautify为true时有效） - 缩进级别，空格数量
                        }
                    });
                    if (ret.error) {
                        this._addLog('error: ' + ret.error.message);
                    } else if (ret.code) {
                        const finalTxt = ret.code.replaceAll(`"` + CONST.TYPENUM_PREFIX, "").replaceAll(CONST.TYPENUM_SUFFIX + `"`, "");
                        fs.writeFile(saveFileFullPath, finalTxt, "utf-8");
                        Editor.Message.send("asset-db", "refresh-asset", 'db://assets/');
                        this._addLog("[JavaScript]" + saveFileFullPath);
                    }
                },
                addAsType(excelCache: ExcelCache) {
                    let importContent = "";
                    let defindContent = "";
                    let funcContent = "";
                    let dmUrl = joinPack("model/Xls.ts");
                    // let dmUrl = Editor.url('packages://' + packageName + '//model//DataManager.ts', 'utf8');
                    let clazData = fs.readFileSync(dmUrl, { encoding: "utf-8" });
                    Object.getOwnPropertyNames(excelCache).forEach(key => {
                        excelCache[key].forEach(sheetData => {
                            if (sheetData.data.length < 4) {
                                this._addLog(`表 ${key}--sheet ${sheetData.name} 行数小于3行,跳过`);
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
                    clazData = clazData.replace("@@import", importContent);
                    clazData = clazData.replace("@@varDefined", defindContent);
                    clazData = clazData.replace("@@funcContent", funcContent);
                    //  let beautifier = new TsBeautifier();
                    let result = clazData; // beautifier.Beautify(clazData);
                    fs.writeFileSync(path.join(this.rawConfigPath, "Xls.ts"), result);
                }
            },
        });
        app.mount(this.$.app!);
        panelDataMap.set(this, app);
    },
    beforeClose() { },
    close() {
        const app = panelDataMap.get(this);
        if (app) {
            app.unmount();
        }
    },
});
