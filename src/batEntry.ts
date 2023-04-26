import path from 'path';
// @ts-ignore
import StupidTask from '../StupidTask.json';
import core from "./panels/default/core";
import fs from "fs-extra"
var c = require('child_process');
var PORT = 9418;       //端口
var DIR = './';     //用于存放html的目录
var mine = require('./mine').types;
import url from "url"
import http from "http"
const myCore = new core();
const originOutput = fs.readFileSync(StupidTask.tsOutput, 'utf-8');

function replaceData(newData: string): string {
    let lineStart = 0;
    let state = 0;
    let lines: Array<string> = originOutput.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (state == 0) {
            if (line.indexOf("var datas = exports('default', ") != -1) {
                lineStart = i;
                state = 1;
            }
        } else if (state == 1) {
            if (line.indexOf(`);`) != -1) {
                lines.splice(lineStart, i - lineStart + 1, "var datas = exports('default', ", newData.substring(0, newData.length - 1), ");");
                state = 2;
                break;
            }
        }
    }
    return lines.join("\n");
}

let timer: NodeJS.Timeout | undefined;
myCore.watch(StupidTask.excelRoot, (log) => {
    // console.log(log);
}, (arr) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        const rlt = myCore.gen(arr, true)
        fs.writeFileSync(StupidTask.tsOutput, replaceData(rlt.datas));
        console.log("数据更新");
    }, 1000)
})

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url!).pathname!;
    var realPath = path.join(DIR, pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
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
