import * as fs from 'fs-extra';
import path from 'path';
import { createApp, App } from 'vue';
import chokidar from "chokidar"
import CfgUtil from '../../CfgUtil';
import * as nodeXlsx from 'node-xlsx';
import { TsBeautifier } from '@brandless/tsbeautify';
import Electron from 'electron';
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
        hello() {
            // if (this.$.text) {
            //     this.$.text.innerHTML = 'hello';
            //     console.log('[cocos-panel-html.default]: hello');
            // }
        },
    },
    ready() {
        let logCtrl = this.$.logTextArea!;
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
            created() {

            },
            data() {
                return {
                    logView: "",
                    excelRootPath: null,
                    configPath: null,
                    isCompressJs: false,  //是否将数据文件打包成json
                    excelArray: [],
                    excelFileArr: [],
                };
            },
            methods: {
                _addLog(str: string) {
                    let time = new Date();
                    this.logView += "[" + time.toLocaleString() + "]: " + str + "\n";
                    logListScrollToBottom();
                },
                onBtnClickTellMe() {
                    let url = "http://wpa.qq.com/msgrd?v=3&uin=654088761&site=qq&menu=yes";
                    Electron.shell.openExternal(url);
                },

                _watchDir(event: string, filePath: string) {
                    let ext = path.extname(filePath);
                    if (ext === ".xlsx" || ext === ".xls") {
                        this._onAnalyzeExcelDirPath(this.excelRootPath);
                    }
                },

                _initPluginCfg() {
                    CfgUtil.initCfg((data) => {
                        if (data) {
                            this.excelRootPath = data.excelRootPath;
                            this.configPath = data.configPath || path.join(Editor.Project.path, "config");;
                            this.isCompressJs = data.isCompressJs || false;
                            if (fs.existsSync(this.excelRootPath)) {
                                this._addLog(`检测并监视文件夹-----${this.excelRootPath}`);
                                chokidar.watch(this.excelRootPath).on('all', this._watchDir.bind(this));
                            }
                        }
                    });
                },
                onBtnClickOpenExcelRootPath() {
                    if (fs.existsSync(this.excelRootPath)) {
                        Electron.shell.openPath(this.excelRootPath).then(err => {
                            Electron.shell.beep()
                        });
                    } else {
                        this._addLog("目录不存在：" + this.excelRootPath);
                    }
                },
                onBtnClickSelectExcelRootPath() {
                    Editor.Dialog.select({
                        title: "选择Excel的根目录",
                        // defaultPath: this.excelRootPath,
                        path: this.excelRootPath,
                        // properties: ['openDirectory'],
                        type: "directory",
                    }).then(res => {
                        if (!res.canceled && res.filePaths.length > 0) {
                            let dir = res.filePaths[0];
                            if (dir !== this.excelRootPath) {
                                this.excelRootPath = dir;
                                this._addLog(`改动成功,检测并监视文件夹-----${this.excelRootPath}`);
                                chokidar.watch(this.excelRootPath).on('all', this._watchDir.bind(this));
                                CfgUtil.saveCfgByData({ excelRootPath: this.excelRootPath });
                            }
                        }
                    })
                    // if (res !== -1) {
                    //     let dir = res[0];
                    //     if (dir !== this.excelRootPath) {
                    //         this.excelRootPath = dir;
                    //         this._addLog(`改动成功,检测并监视文件夹-----${this.excelRootPath}`);
                    //         chokidar.watch(this.excelRootPath).on('all', this._watchDir.bind(this));
                    //         CfgUtil.saveCfgByData({ excelRootPath: this.excelRootPath });
                    //     }
                    // }
                },
                onBtnClickSelectConfigPath() {
                    Editor.Dialog.select({
                        title: "选择导出的配置目录",
                        path: Editor.Project.path,
                        // defaultPath: Editor.Project.path,
                        type: "directory",
                        // properties: ['openDirectory'],
                    }).then(res => {
                        if (!res.canceled && res.filePaths.length > 0) {
                            let dir = res.filePaths[0];
                            if (dir !== this.configPath) {
                                this.configPath = dir;
                                CfgUtil.saveCfgByData({ configPath: this.configPath });
                            }
                        }
                    });
                    // let res = Editor.Dialog.openFile({
                    //     title: "选择导出的配置目录",
                    //     defaultPath: Editor.Project.path,
                    //     properties: ['openDirectory'],
                    // });
                    // if (res !== -1) {
                    //     let dir = res[0];
                    //     if (dir !== this.configPath) {
                    //         this.configPath = dir;
                    //         CfgUtil.saveCfgByData({ configPath: this.configPath });
                    //     }
                    // }
                },
                onBtnIsCompressJsCheck(event: any) {
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
                onBtnClickOpenJsonSavePath() {
                    if (fs.existsSync(this.jsonSavePath)) {
                        Electron.shell.showItemInFolder(this.jsonSavePath);
                        Electron.shell.beep();
                    } else {
                        this._addLog("目录不存在：" + this.jsonSavePath);
                    }
                },
                onBtnClickOpenJsSavePath() {
                    if (fs.existsSync(this.configPath)) {
                        Electron.shell.openPath(this.configPath).then(ret => {
                            Electron.shell.beep();
                        });
                    } else {
                        this._addLog("目录不存在：" + this.configPath);
                    }
                },
                // _getScriptSaveData(excelData: string[], itemSheet) {
                //     let title = excelData[0];  //
                //     let sheetFormatData = {};
                //     let type = excelData[2];
                //     for (let i = 3; i < excelData.length; i++) {
                //         let lineData = excelData[i];
                //         let saveLineData = {};
                //         for (let j = 1; j < title.length; j++) {
                //             let key = title[j];
                //             let value = lineData[j];
                //             if (value === undefined) {
                //                 value = null;
                //                 this._addLog("[Error] 发现空单元格:" + itemSheet.name + "*" + itemSheet.sheet + " => (" + key + "," + (i + 1) + ")");
                //             } else if (type[j].toLowerCase().startsWith("list")) {
                //                 value = value ? (value + "").split(",") : [];
                //                 let innerType = type[j].toLowerCase().match(/[^<]\w+(?=>)/)[0];
                //                 if (innerType === "number") {
                //                     value = value.reduce((array, cur, index) => {
                //                         array.push(Number(cur));
                //                         return array;
                //                     }, []);
                //                 }
                //             }
                //             saveLineData[key] = value;
                //         }
                //         if (!lineData[0]) {
                //             this._addLog("[Error] 发现id是空的单元格,将被忽略并跳过后面的数据:" + itemSheet.name + "*" + itemSheet.sheet);
                //             break;
                //         }
                //         sheetFormatData[lineData[0].toString()] = saveLineData;
                //     }
                //     return sheetFormatData;
                // },
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
                                let columDesc = desc[i];
                                let columType = type[i];
                                let lowType = columType.toLowerCase();
                                if (typeEnum.includes(lowType)) {
                                    typeStr += `${varName}:`
                                    columDesc = columDesc == undefined ? "\n" : "//" + columDesc + "\n";
                                    switch (lowType) {
                                        case "string":
                                            typeStr += `string;   ${columDesc}`;
                                            break;
                                        case "number":
                                            typeStr += `number; ${columDesc}`;
                                            break;
                                        case "list<number>":
                                            typeStr += `Array<number>; ${columDesc}`;
                                            break;
                                        case "list<string>":
                                            typeStr += `Array<string>; ${columDesc}`;
                                            break;
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
                    fs.writeFileSync(path.join(this.configPath, "ConfigTypeDefind.ts"), result);
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
                    fs.emptyDirSync(this.configPath);
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
                    let saveStr = "module.exports=";
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
                                    if (!sheetData.data[i][0]) {
                                        continue;
                                    }
                                    for (let j = 0; j < attrLength; j++) {
                                        let key = sheetData.data[0][j];
                                        let value = sheetData.data[i][j];
                                        if (value !== undefined) {
                                            let type = sheetData.data[2][j].toLowerCase();
                                            let typeArray = type.match(/[^<]\w+(?=>)/);
                                            if (typeArray) {
                                                // number list
                                                value = (value + "").split(",");
                                                if (typeArray[0] === "number") {
                                                    value = (value as Array<any>).reduce((pre, cur) => {
                                                        pre.push(Number(cur));
                                                        return pre;
                                                    }, []);
                                                }
                                            } else if (type === "number") {
                                                value = Number(value);
                                            } else if (type === "string") {
                                                value = value + "";
                                            } else {
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
                    let saveFileFullPath = path.join(this.configPath, "Datas.js");
                    saveStr += JSON.stringify(jsSaveData);
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
                        fs.writeFile(saveFileFullPath, ret.code, "utf-8");
                        Editor.Message.send("asset-db", "refresh-asset", 'db://assets/');
                        this._addLog("[JavaScript]" + saveFileFullPath);
                    }
                },
                addAsType(excelCache: ExcelCache) {
                    let importContent = "";
                    let defindContent = "";
                    let funcContent = "";
                    let dmUrl = joinPack("model/DataManager.ts");
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
                            //add datamanager
                            //添加import内容------------

                            // export let AIDatas: Array<AIData>;
                            // export let AIDatasById: { [key: number]: AIData };
                            importContent += `import {${sheetName}Data} from "./ConfigTypeDefind";\n`;
                            defindContent += `export let ${sheetName}DatasArray:Array<${sheetName}Data>;\n`;
                            defindContent += `export let ${sheetName}DatasById:{[key in ${idType}]:${sheetName}Data};\n`;
                            funcContent += `        ${sheetName}DatasArray=arrayData("${sheetName}",datas);\n`;
                            funcContent += `        ${sheetName}DatasById=datas["${sheetName}"];\n`;
                            // AIDatas = datas["AI"];
                            // AIDatasById = getsById<AIData>(AIDatas);
                        });
                    });
                    clazData = clazData.replace("@@import", importContent);
                    clazData = clazData.replace("@@varDefined", defindContent);
                    clazData = clazData.replace("@@funcContent", funcContent);
                    //  let beautifier = new TsBeautifier();
                    let result = clazData; // beautifier.Beautify(clazData);
                    fs.writeFileSync(path.join(this.configPath, "DataManager.ts"), result);
                }
            },
        });
        app.mount(this.$.app!);
        panelDataMap.set(this, app);

        // if (this.$.text) {
        //     this.$.text.innerHTML = 'Hello Cocos.';
        // }
        // if (this.$.app) {
        //     const app = createApp({});
        //     app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
        //     app.component('MyCounter', {
        //         template: readFileSync(join(__dirname, '../../../static/template/vue/counter.html'), 'utf-8'),
        //         data() {
        //             return {
        //                 counter: 0,
        //             };
        //         }, methods: {
        //             addition() {
        //                 this.counter += 1;
        //             },
        //             subtraction() {
        //                 this.counter -= 1;
        //             },
        //         },
        //     });
        //     app.mount(this.$.app);
        //     panelDataMap.set(this, app);
        // }
    },
    beforeClose() { },
    close() {
        const app = panelDataMap.get(this);
        if (app) {
            app.unmount();
        }
    },
});
