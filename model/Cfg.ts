import datas from './Config';
@@import

export default class Cfg {
    @@varDefined

    public static init() {
        @@funcContent
    }

    private static _arrayData(key: string, datas: { [key in string]: any }) {
        let values = [];
        let items = datas[key];
        for (let key1 in items) {
            values.push(items[key1]);
        }
        return values;
    }
}
