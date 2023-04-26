"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
// @ts-ignore
var StupidTask_json_1 = __importDefault(require("../StupidTask.json"));
var core_1 = __importDefault(require("./panels/default/core"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var c = require('child_process');
var PORT = 9418; //端口
var DIR = './'; //用于存放html的目录
var mine = require('./mine').types;
var url_1 = __importDefault(require("url"));
var http_1 = __importDefault(require("http"));
var myCore = new core_1.default();
var originOutput = fs_extra_1.default.readFileSync(StupidTask_json_1.default.tsOutput, 'utf-8');
// @ts-ignore
String.prototype.replaceAll = function (searcher, replacer) {
    return this.split(searcher).join(replacer);
};
function replaceData(newData) {
    var lineStart = 0;
    var state = 0;
    var lines = originOutput.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (state == 0) {
            if (line.indexOf("var datas = exports('default', ") != -1) {
                lineStart = i;
                state = 1;
            }
        }
        else if (state == 1) {
            if (line.indexOf(");") != -1) {
                lines.splice(lineStart, i - lineStart + 1, "var datas = exports('default', ", newData.substring(0, newData.length - 1), ");");
                state = 2;
                break;
            }
        }
    }
    return lines.join("\n");
}
var timer;
myCore.watch(StupidTask_json_1.default.excelRoot, function (log) {
    // console.log(log);
}, function (arr) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        var rlt = myCore.gen(arr, true);
        fs_extra_1.default.writeFileSync(StupidTask_json_1.default.tsOutput, replaceData(rlt.datas));
        console.log("数据更新");
    }, 1000);
});
var server = http_1.default.createServer(function (request, response) {
    var pathname = url_1.default.parse(request.url).pathname;
    var realPath = path_1.default.join(DIR, pathname);
    console.log(realPath);
    var ext = path_1.default.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs_extra_1.default.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        }
        else {
            fs_extra_1.default.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                }
                else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
// 使用默认浏览器打开
c.exec('start http://127.0.0.1:' + PORT + '/index.html');
