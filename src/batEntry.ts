// @ts-ignore
import StupidTask from '../StupidTask.json';
import core from "./panels/default/core";
import fs from "fs-extra"

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
                lines.splice(lineStart, i - lineStart + 1, "var datas = exports('default', ", newData, ");");
                state = 2;
                break;
            }
        }
    }
    return lines.join("\n");
}

fs.writeFileSync("testOutput.js", replaceData("{buff:{0: {id:0,name:'test'} } }"));

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