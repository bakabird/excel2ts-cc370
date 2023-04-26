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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = __importDefault(require("chokidar"));
var fs = __importStar(require("fs-extra"));
var nodeXlsx = __importStar(require("node-xlsx"));
var path_1 = __importDefault(require("path"));
var uglifyJs = require("uglify-js");
var CONST = {
    TYPENUM_PREFIX: "wqidhd98213uhj89wqe",
    TYPENUM_SUFFIX: "s8j12893u8912ue8912",
};
var ExcelDealreCore = /** @class */ (function () {
    function ExcelDealreCore() {
        this.rawExcelRootPath = "";
        console.log('ExcelDealreCore');
    }
    ExcelDealreCore.prototype.watch = function (excelRootPath, onAddLog, onUpdateExcelSheetArray) {
        var _a, _b;
        this.rawExcelRootPath = excelRootPath;
        this._onAddLog = onAddLog;
        this._onUpdateExcelSheetArray = onUpdateExcelSheetArray;
        (_a = this._lastWatch) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        this._lastWatch = chokidar_1.default.watch(this.rawExcelRootPath);
        this._lastWatch.on('all', this._watchDir.bind(this));
        (_b = this._onAddLog) === null || _b === void 0 ? void 0 : _b.call(this, "watch " + excelRootPath);
    };
    ExcelDealreCore.prototype._watchDir = function (event, filePath) {
        var _a, _b;
        (_a = this._onAddLog) === null || _a === void 0 ? void 0 : _a.call(this, "_watchDir " + filePath);
        var ext = path_1.default.extname(filePath);
        if (ext === ".xlsx" || ext === ".xls") {
            var sheetArray = this._onAnalyzeExcelDirPath(this.rawExcelRootPath);
            (_b = this._onUpdateExcelSheetArray) === null || _b === void 0 ? void 0 : _b.call(this, sheetArray);
        }
    };
    // 查找出目录下的所有excel文件
    ExcelDealreCore.prototype._onAnalyzeExcelDirPath = function (dir) {
        var _a, _b, _c;
        if (dir) {
            var readDirSync = function (dirPath) {
                var _a;
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
                            (_a = self_1._onAddLog) === null || _a === void 0 ? void 0 : _a.call(self_1, "检索到excel产生的临时文件:" + itemFullPath);
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
                    (_a = self_1._onAddLog) === null || _a === void 0 ? void 0 : _a.call(self_1, "不支持的文件类型：" + file);
                }
            }
            // 组装显示的数据  
            var excelSheetArray = [];
            (_b = self_1._onAddLog) === null || _b === void 0 ? void 0 : _b.call(self_1, "检测到excel文件数量:" + excelFileArr.length);
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
                        (_c = self_1._onAddLog) === null || _c === void 0 ? void 0 : _c.call(self_1, "[Error] 空Sheet: " + itemData.name + " - " + itemData.sheet);
                        continue;
                    }
                    excelSheetArray.push(itemData);
                }
            }
            return excelSheetArray;
        }
        return [];
    };
    ExcelDealreCore.prototype.gen = function (excelSheetArray, isCompressJs, managerTemplate) {
        var excelCache = {};
        for (var k = 0; k < excelSheetArray.length; k++) {
            var itemSheet = excelSheetArray[k];
            if (itemSheet.isUse) {
                var excelData = excelCache[itemSheet.fullPath];
                if (!excelData) {
                    excelData = nodeXlsx.parse(itemSheet.fullPath);
                    excelCache[itemSheet.fullPath] = excelData;
                }
            }
            else {
                console.log("忽略配置: " + itemSheet.fullPath + ' - ' + itemSheet.sheet);
            }
        }
        return {
            //添加ts 类型
            typeInterface: this._genTypeInter(excelCache),
            //添加dataManager定义
            dataManager: managerTemplate ? this._genManager(excelCache, managerTemplate) : "",
            datas: this._genDatas(excelCache, isCompressJs),
        };
    };
    /**
     *
     * @param {*} excelData
     * @param {*} itemSheet
     * 定义 ts接口类型
     */
    ExcelDealreCore.prototype._genTypeInter = function (excelCache) {
        var _this = this;
        var typeStr = "";
        var typeEnum = ["string", "number", "list<string>", "list<number>"];
        Object.getOwnPropertyNames(excelCache).forEach(function (key) {
            excelCache[key].forEach(function (sheetData) {
                var _a, _b;
                if (sheetData.data.length < 4) {
                    (_a = _this._onAddLog) === null || _a === void 0 ? void 0 : _a.call(_this, "\u8868 ".concat(key, "--sheet ").concat(sheetData.name, " \u884C\u6570\u5C0F\u4E8E3\u884C,\u8DF3\u8FC7"));
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
                        (_b = _this._onAddLog) === null || _b === void 0 ? void 0 : _b.call(_this, "[Error] 发现空单元格type:" + key + ":" + columType + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
                    }
                }
                typeStr += "};\n";
            });
        });
        return typeStr;
    };
    ExcelDealreCore.prototype._genDatas = function (excelCache, isCompressJs) {
        var _this = this;
        var _a;
        var saveStr = "";
        var jsSaveData = {};
        Object.getOwnPropertyNames(excelCache).forEach(function (key) {
            // 保存为ts
            excelCache[key].forEach(function (sheetData) {
                var _a, _b;
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
                                    (_a = _this._onAddLog) === null || _a === void 0 ? void 0 : _a.call(_this, "[Error] 发现空单元格type:" + sheetData.name + ":" + type + " =>类型不符合枚举值 [string] [number] [list<string>] [list<number>]");
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
                    (_b = _this._onAddLog) === null || _b === void 0 ? void 0 : _b.call(_this, "行数低于3行,无效sheet:" + sheetData.name);
                }
            });
        });
        saveStr += JSON.stringify(jsSaveData);
        var ret = uglifyJs.minify(uglifyJs.parse("var json =" + saveStr), {
            output: {
                beautify: !isCompressJs,
                indent_start: 0,
                indent_level: 4, //（仅当beautify为true时有效） - 缩进级别，空格数量
            }
        });
        if (ret.error) {
            (_a = this._onAddLog) === null || _a === void 0 ? void 0 : _a.call(this, 'error: ' + ret.error.message);
            return "";
        }
        else if (ret.code) {
            var finalTxt = ret.code.replaceAll("var json=", "").replaceAll("\"" + CONST.TYPENUM_PREFIX, "").replaceAll(CONST.TYPENUM_SUFFIX + "\"", "");
            return finalTxt;
        }
    };
    ExcelDealreCore.prototype._genManager = function (excelCache, tempalte) {
        var _this = this;
        var importContent = "";
        var defindContent = "";
        var funcContent = "";
        Object.getOwnPropertyNames(excelCache).forEach(function (key) {
            excelCache[key].forEach(function (sheetData) {
                var _a;
                if (sheetData.data.length < 4) {
                    (_a = _this._onAddLog) === null || _a === void 0 ? void 0 : _a.call(_this, "\u8868 ".concat(key, "--sheet ").concat(sheetData.name, " \u884C\u6570\u5C0F\u4E8E3\u884C,\u8DF3\u8FC7"));
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
        tempalte = tempalte.replace("@@import", importContent);
        tempalte = tempalte.replace("@@varDefined", defindContent);
        tempalte = tempalte.replace("@@funcContent", funcContent);
        //  let beautifier = new TsBeautifier();
        var result = tempalte; // beautifier.Beautify(clazData);
        return result;
    };
    return ExcelDealreCore;
}());
exports.default = ExcelDealreCore;
