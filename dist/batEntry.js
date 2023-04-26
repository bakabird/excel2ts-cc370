"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const StupidTask_json_1 = __importDefault(require("../StupidTask.json"));
const core_1 = __importDefault(require("./panels/default/core"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const myCore = new core_1.default();
const originOutput = fs_extra_1.default.readFileSync(StupidTask_json_1.default.tsOutput, 'utf-8');
function replaceData(newData) {
    let lineStart = 0;
    let state = 0;
    let lines = originOutput.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (state == 0) {
            if (line.indexOf("var datas = exports('default', ") != -1) {
                lineStart = i;
                state = 1;
            }
        }
        else if (state == 1) {
            if (line.indexOf(`);`) != -1) {
                lines.splice(lineStart, i - lineStart + 1, "var datas = exports('default', ", newData, ");");
                state = 2;
                break;
            }
        }
    }
    return lines.join("\n");
}
fs_extra_1.default.writeFileSync("testOutput.js", replaceData("{buff:{0: {id:0,name:'test'} } }"));
// let timer: NodeJS.Timeout | undefined;
// myCore.watch(StupidTask.excelRoot, (log) => {
//     console.log(log);
// }, (arr) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//         const rlt = myCore.gen(arr, true)
//         console.log(rlt.datas);
//     }, 1000)
// })
