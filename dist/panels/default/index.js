"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsbeautify_1 = require("@brandless/tsbeautify");
var chokidar_1 = __importDefault(require("chokidar"));
var fs = __importStar(require("fs-extra"));
var nodeXlsx = __importStar(require("node-xlsx"));
var path_1 = __importDefault(require("path"));
var vue_1 = require("vue");
var CfgUtil_1 = __importDefault(require("../../CfgUtil"));
var core_1 = __importDefault(require("./core"));
var uglifyJs = require("uglify-js");
var join = path_1.default.join;
var joinPack = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return join.apply(void 0, __spreadArray([__dirname, '../../../'], arg, false));
};
var panelDataMap = new WeakMap();
var CONST = {
    TYPENUM_PREFIX: "wqidhd98213uhj89wqe",
    TYPENUM_SUFFIX: "s8j12893u8912ue8912",
};
var core = new core_1.default();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show: function () { console.log('show'); },
        hide: function () { console.log('hide'); },
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
    ready: function () {
        var logCtrl = this.$.logTextArea;
        var logListScrollToBottom = function () {
            setTimeout(function () {
                logCtrl.scrollTop = logCtrl.scrollHeight;
            }, 10);
        };
        var app = (0, vue_1.createApp)({});
        app.config.compilerOptions.isCustomElement = function (tag) { return tag.startsWith('ui-'); };
        app.component('excel-item', {
            props: ['data', 'index'],
            template: fs.readFileSync(joinPack('static/template/vue/excelItem.html'), 'utf-8'),
            methods: {
                onBtnClickUse: function () {
                    this.data.isUse = !this.data.isUse;
                    console.log("on use: " + this.data.isUse);
                }
            },
        });
        app.component('MyApp', {
            template: fs.readFileSync(joinPack('static/template/vue/app.html'), 'utf-8'),
            setup: function () {
                var tsDir = (0, vue_1.ref)(0);
                var excelDir = (0, vue_1.ref)(0);
                // 返回值会暴露给模板和其他的选项式 API 钩子
                return {
                    tsDir: tsDir,
                    excelDir: excelDir,
                };
            },
            data: function () {
                return {
                    logView: "",
                    excelRootPath: "project://",
                    configPath: "project://",
                    isCompressJs: false,
                    excelArray: [],
                    excelFileArr: [],
                };
            },
            mounted: function () {
                this._initPluginCfg();
            },
            computed: {
                rawConfigPath: function () {
                    return Editor.UI.File.resolveToRaw(this.configPath);
                },
                rawExcelRootPath: function () {
                    if (this.excelRootPath) {
                        return Editor.UI.File.resolveToRaw(this.excelRootPath);
                    }
                    else {
                        return null;
                    }
                },
            },
            watch: {
                // 侦听根级属性
                logView: function (val, oldVal) {
                    logCtrl.value = val;
                }
            },
            methods: {
                _corewatch: function () {
                    var _this = this;
                    core.watch(this.rawExcelRootPath, function (log) {
                        _this._addLog(log);
                    }, function (arr) {
                        _this.excelArray = arr;
                    });
                },
                _addLog: function (str) {
                    var time = new Date();
                    this.logView += "[" + time.toLocaleString() + "]: " + str + "\n";
                    logListScrollToBottom();
                },
                _watchDir: function (event, filePath) {
                    console.log(event);
                    var ext = path_1.default.extname(filePath);
                    if (ext === ".xlsx" || ext === ".xls") {
                        this._onAnalyzeExcelDirPath(this.rawExcelRootPath);
                    }
                },
                _initPluginCfg: function () {
                    var _this = this;
                    CfgUtil_1.default.initCfg(function (data) {
                        _this.tsDir.protocol = "project";
                        _this.excelDir.protocol = "project";
                        if (data) {
                            _this.excelRootPath = data.excelRootPath;
                            _this.configPath = data.configPath || "project://";
                            _this.isCompressJs = data.isCompressJs || false;
                            console.log(_this.excelRootPath);
                            console.log(_this.rawExcelRootPath);
                            if (_this.excelRootPath && fs.existsSync(_this.rawExcelRootPath)) {
                                _this._addLog("\u68C0\u6D4B\u5E76\u76D1\u89C6\u6587\u4EF6\u5939-----".concat(_this.rawExcelRootPath));
                                _this._corewatch();
                            }
                            _this.tsDir.value = _this.configPath;
                            _this.excelDir.value = _this.excelRootPath;
                        }
                    });
                },
                _initPluginCfg2: function () {
                    var _this = this;
                    CfgUtil_1.default.initCfg(function (data) {
                        _this.tsDir.protocol = "project";
                        _this.excelDir.protocol = "project";
                        if (data) {
                            _this.excelRootPath = data.excelRootPath;
                            _this.configPath = data.configPath || "project://";
                            _this.isCompressJs = data.isCompressJs || false;
                            console.log(_this.excelRootPath);
                            console.log(_this.rawExcelRootPath);
                            if (_this.excelRootPath && fs.existsSync(_this.rawExcelRootPath)) {
                                _this._addLog("\u68C0\u6D4B\u5E76\u76D1\u89C6\u6587\u4EF6\u5939-----".concat(_this.rawExcelRootPath));
                                chokidar_1.default.watch(_this.rawExcelRootPath).on('all', _this._watchDir.bind(_this));
                            }
                            _this.tsDir.value = _this.configPath;
                            _this.excelDir.value = _this.excelRootPath;
                        }
                    });
                },
                onConfirmConfigPath: function (dir) {
                    console.log("confirm config path: " + dir);
                    this.configPath = dir;
                    CfgUtil_1.default.saveCfgByData({ configPath: this.configPath });
                },
                onConfirmExcelRootPath: function (dir) {
                    console.log("confirm excel root path: " + dir);
                    this.excelRootPath = dir;
                    CfgUtil_1.default.saveCfgByData({ excelRootPath: this.excelRootPath });
                    this._addLog("\u6539\u52A8\u6210\u529F,\u68C0\u6D4B\u5E76\u76D1\u89C6\u6587\u4EF6\u5939-----".concat(this.rawExcelRootPath));
                    this._corewatch();
                },
                onConfirmExcelRootPath2: function (dir) {
                    console.log("confirm excel root path: " + dir);
                    this.excelRootPath = dir;
                    CfgUtil_1.default.saveCfgByData({ excelRootPath: this.excelRootPath });
                    this._addLog("\u6539\u52A8\u6210\u529F,\u68C0\u6D4B\u5E76\u76D1\u89C6\u6587\u4EF6\u5939-----".concat(this.rawExcelRootPath));
                    chokidar_1.default.watch(this.rawExcelRootPath).on('all', this._watchDir.bind(this));
                },
                onConfirmCompressJs: function (event) {
                    console.log("onBtnIsCompressJsCheck " + event.target.value);
                    this.isCompressJs = event.target.value;
                    CfgUtil_1.default.saveCfgByData({ isCompressJs: this.isCompressJs });
                },
                // 查找出目录下的所有excel文件
                _onAnalyzeExcelDirPath: function (dir) {
                    if (dir) {
                        var readDirSync = function (dirPath) {
                            var dirInfo = fs.readdirSync(dirPath);
                            for (var i = 0; i < dirInfo.length; i++) {
                                var item = dirInfo[i];
                                var itemFullPath = path_1.default.join(dirPath, item);
                                var info = fs.statSync(itemFullPath);
                                if (info.isDirectory()) {
                                    // this._addLog('dir: ' + itemFullPath);
                                    readDirSync(itemFullPath);
                                }
                                else if (info.isFile()) {
                                    var headStr = item.substr(0, 2);
                                    if (headStr === "~$") {
                                        self_1._addLog("检索到excel产生的临时文件:" + itemFullPath);
                                    }
                                    else {
                                        allFileArr_1.push(itemFullPath);
                                    }
                                    // this._addLog('file: ' + itemFullPath);
                                }
                            }
                        };
                        var self_1 = this;
                        // 查找json文件
                        var allFileArr_1 = [];
                        var excelFileArr = [];
                        // 获取目录下所有的文件
                        readDirSync(dir);
                        // 过滤出来.xlsx的文件
                        for (var k in allFileArr_1) {
                            var file = allFileArr_1[k];
                            var extName = path_1.default.extname(file);
                            if (extName === ".xlsx" || extName === ".xls") {
                                excelFileArr.push(file);
                            }
                            else {
                                this._addLog("不支持的文件类型: " + file);
                            }
                        }
                        // 组装显示的数据  
                        var excelSheetArray = [];
                        this._addLog("检测到excel文件数量:" + excelFileArr.length);
                        for (var k in excelFileArr) {
                            var itemFullPath = excelFileArr[k];
                            var path1 = itemFullPath.substr(dir.length + 1, itemFullPath.length - dir.length);
                            var excelData = nodeXlsx.parse(itemFullPath);
                            for (var sheetKey in excelData) {
                                var itemData = {
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
                    }
                },
                onBtnClickSelectSheet: function (event) {
                    var b = event.currentTarget.value;
                    console.log("onBtnClickSelectSheet " + b);
                    for (var k in this.excelArray) {
                        this.excelArray[k].isUse = b;
                    }
                },
                /**
                 *
                 * @param {*} excelData
                 * @param {*} itemSheet
                 * 定义 ts接口类型
                 */
                _saveTypeInter: function (excelCache) {
                    var _this = this;
                    var typeStr = "";
                    var typeEnum = ["string", "number", "list<string>", "list<number>"];
                    Object.getOwnPropertyNames(excelCache).forEach(function (key) {
                        excelCache[key].forEach(function (sheetData) {
                            if (sheetData.data.length < 4) {
                                _this._addLog("\u8868 ".concat(key, "--sheet ").concat(sheetData.name, " \u884C\u6570\u5C0F\u4E8E3\u884C,\u8DF3\u8FC7"));
                                return;
                            }
                            var title = sheetData.data[0]; //
                            var desc = sheetData.data[1]; //注释  描述
                            var type = sheetData.data[2]; //类型,
                            var sheetName = sheetData.name.match(/[^<]*\w+(?=>)*/)[0];
                            typeStr += "export interface ".concat(sheetName, "Data{");
                            for (var i = 0; i < type.length; i++) {
                                var varName = title[i];
                                var columDesc = desc[i].split("\n");
                                var columType = type[i];
                                var enumType = columType.match(/[^()]\w+(?=\))/);
                                if (typeEnum.includes(columType) || enumType) {
                                    typeStr += "\n";
                                    if (columDesc.length < 2) {
                                        typeStr += "/** ".concat(columDesc, " */");
                                    }
                                    else {
                                        typeStr += "/**\n" + columDesc.map(function (l) { return "\t * " + l; }).join("\n") + "\n\t */";
                                    }
                                    typeStr += "\n";
                                    typeStr += "".concat(varName, ":");
                                    if (!enumType) {
                                        // columDesc == undefined ? "\n" : "//" + columDesc + "\n";
                                        switch (columType) {
                                            case "string":
                                                typeStr += "string;";
                                                break;
                                            case "number":
                                                typeStr += "number;";
                                                break;
                                            case "list<number>":
                                                typeStr += "Array<number>;";
                                                break;
                                            case "list<string>":
                                                typeStr += "Array<string>;";
                                                break;
                                        }
                                    }
                                    else {
                                        typeStr += enumType[0];
                                    }
                                }
                                else {
                                    _this._addLog("[Error] 发现空单元格type:" + key + ":" + columType + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                                }
                            }
                            typeStr += "};\n";
                        });
                    });
                    //todo 
                    var beautifier = new tsbeautify_1.TsBeautifier();
                    var result = beautifier.Beautify(typeStr);
                    fs.writeFileSync(path_1.default.join(this.rawConfigPath, "ConfigTypeDefind.ts"), result);
                    return typeStr;
                },
                // 生成配置
                onBtnClickGen: function () {
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
                    var filtered = this.excelArray.filter(function (itemSheet) {
                        if (itemSheet.isUse) {
                            return true;
                        }
                        else {
                            console.log("忽略配置: " + itemSheet.fullPath + ' - ' + itemSheet.sheet);
                            return false;
                        }
                    });
                    var dmUrl = joinPack("model/Xls.ts");
                    // let dmUrl = Editor.url('packages://' + packageName + '//model//DataManager.ts', 'utf8');
                    var clazData = fs.readFileSync(dmUrl, { encoding: "utf-8" });
                    var _a = core.gen(filtered, this.isCompressJs, clazData), typeInterface = _a.typeInterface, dataManager = _a.dataManager, datas = _a.datas;
                    var beautifier = new tsbeautify_1.TsBeautifier();
                    typeInterface = beautifier.Beautify(typeInterface);
                    var dataFileFullPath = path_1.default.join(this.rawConfigPath, "Config.ts");
                    fs.writeFileSync(path_1.default.join(this.rawConfigPath, "ConfigTypeDefind.ts"), typeInterface);
                    fs.writeFileSync(path_1.default.join(this.rawConfigPath, "Xls.ts"), dataManager);
                    fs.writeFileSync(dataFileFullPath, "export default " + datas, "utf-8");
                    Editor.Message.send("asset-db", "refresh-asset", 'db://assets/');
                    this._addLog("[JavaScript]" + dataFileFullPath);
                    this._addLog("全部转换完成!");
                },
                addMainDatas: function (excelCache) {
                    var _this = this;
                    var saveStr = "export default ";
                    var jsSaveData = {};
                    Object.getOwnPropertyNames(excelCache).forEach(function (key) {
                        // 保存为ts
                        excelCache[key].forEach(function (sheetData) {
                            if (sheetData.data.length > 3) {
                                // let attrName=sheetData.data[0];
                                //去掉中文部分  格式: 你好<hello>
                                var cloumMap = {};
                                //这里保存sheet字段得长度,因为后面可能出现因为空列而不计入列循环得情况,导致生成得数据直接没了字段
                                var attrLength = sheetData.data[0].length;
                                for (var i = 3; i < sheetData.data.length; i++) {
                                    var keyMap = {};
                                    //有可能出现id为空的情况(可能是完全的空行)
                                    if (sheetData.data[i][0] == null || sheetData.data[i][0] == undefined) {
                                        continue;
                                    }
                                    for (var j = 0; j < attrLength; j++) {
                                        var key_1 = sheetData.data[0][j];
                                        var value = sheetData.data[i][j];
                                        if (value !== undefined) {
                                            var type = sheetData.data[2][j];
                                            var typeArray = type.match(/[^<]\w+(?=>)/);
                                            var typeEnum = type.match(/[^()]\w+(?=\))/);
                                            if (typeArray) {
                                                // number list
                                                value = (value + "").split(",");
                                                if (typeArray[0] === "number") {
                                                    value = value.reduce(function (pre, cur) {
                                                        pre.push(Number(cur));
                                                        return pre;
                                                    }, []);
                                                }
                                            }
                                            else if (typeEnum) {
                                                // enum
                                                value = CONST.TYPENUM_PREFIX + typeEnum[0] + "." + value + CONST.TYPENUM_SUFFIX;
                                            }
                                            else if (type === "number") {
                                                value = Number(value);
                                            }
                                            else if (type === "string") {
                                                value = value + "";
                                            }
                                            else {
                                                _this._addLog("[Error] 发现空单元格type:" + sheetData.name + ":" + type + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                                            }
                                        }
                                        else {
                                            value = null;
                                        }
                                        keyMap[key_1] = value;
                                    }
                                    //用id做键值
                                    cloumMap[sheetData.data[i][0]] = keyMap;
                                }
                                //去掉sheetName中文部分
                                var matchRlt = sheetData.name.match(/[^<]*\w+(?=>)*/);
                                if (!matchRlt)
                                    throw "sheetDataName ".concat(sheetData.name, " matchRlt is null");
                                var sheetName = matchRlt[0];
                                jsSaveData[sheetName] = cloumMap;
                            }
                            else {
                                _this._addLog("行数低于3行,无效sheet:" + sheetData.name);
                            }
                        });
                    });
                    var saveFileFullPath = path_1.default.join(this.rawConfigPath, "Config.ts");
                    saveStr += JSON.stringify(jsSaveData);
                    var ret = uglifyJs.minify(uglifyJs.parse(saveStr), {
                        output: {
                            beautify: !this.isCompressJs,
                            indent_start: 0,
                            indent_level: 4, //（仅当beautify为true时有效） - 缩进级别，空格数量
                        }
                    });
                    if (ret.error) {
                        this._addLog('error: ' + ret.error.message);
                    }
                    else if (ret.code) {
                        var finalTxt = ret.code.replaceAll("\"" + CONST.TYPENUM_PREFIX, "").replaceAll(CONST.TYPENUM_SUFFIX + "\"", "");
                        fs.writeFile(saveFileFullPath, finalTxt, "utf-8");
                        Editor.Message.send("asset-db", "refresh-asset", 'db://assets/');
                        this._addLog("[JavaScript]" + saveFileFullPath);
                    }
                },
                addAsType: function (excelCache) {
                    var _this = this;
                    var importContent = "";
                    var defindContent = "";
                    var funcContent = "";
                    var dmUrl = joinPack("model/Xls.ts");
                    // let dmUrl = Editor.url('packages://' + packageName + '//model//DataManager.ts', 'utf8');
                    var clazData = fs.readFileSync(dmUrl, { encoding: "utf-8" });
                    Object.getOwnPropertyNames(excelCache).forEach(function (key) {
                        excelCache[key].forEach(function (sheetData) {
                            if (sheetData.data.length < 4) {
                                _this._addLog("\u8868 ".concat(key, "--sheet ").concat(sheetData.name, " \u884C\u6570\u5C0F\u4E8E3\u884C,\u8DF3\u8FC7"));
                                return;
                            }
                            var idType = sheetData.data[2][0]; //id的类型
                            //去掉sheetName中文部分
                            var matchRlt = sheetData.name.match(/[^<]*\w+(?=>)*/);
                            if (!matchRlt) {
                                throw Error(sheetData.name + " matchRlt is Null");
                            }
                            var sheetName = matchRlt[0];
                            //添加import内容------------
                            importContent += "import {".concat(sheetName, "Data} from \"./ConfigTypeDefind\";\n");
                            defindContent += "public static ".concat(sheetName, "DatasArray: Array<").concat(sheetName, "Data>;\n");
                            defindContent += "public static ".concat(sheetName, "DatasById: { [key in ").concat(idType, "]: ").concat(sheetName, "Data };\n");
                            funcContent += "        this.".concat(sheetName, "DatasArray = this._arrayData(\"").concat(sheetName, "\", datas);\n");
                            funcContent += "        this.".concat(sheetName, "DatasById = datas[\"").concat(sheetName, "\"];\n");
                        });
                    });
                    clazData = clazData.replace("@@import", importContent);
                    clazData = clazData.replace("@@varDefined", defindContent);
                    clazData = clazData.replace("@@funcContent", funcContent);
                    //  let beautifier = new TsBeautifier();
                    var result = clazData; // beautifier.Beautify(clazData);
                    fs.writeFileSync(path_1.default.join(this.rawConfigPath, "Xls.ts"), result);
                }
            },
        });
        app.mount(this.$.app);
        panelDataMap.set(this, app);
    },
    beforeClose: function () { },
    close: function () {
        var app = panelDataMap.get(this);
        if (app) {
            app.unmount();
        }
    },
});
