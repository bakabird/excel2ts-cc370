# 项目简介

一款简单的excel转换为typescript代码配置的cocos插件.转换主要生成以下几个文件:
- ConfigTypeDefind.ts //excel 数据类型定义
- DataManager.ts  //excel数据管理类,方便调用
- Datas.js     //excel 数据主体文件,所有excel数据都在这里

## 特色

1. 转换后的代码自带接口定义,支持ts语法提示,从此少掉几根头发.
2. 使用简单容易上手.
3. 随时更新
如果你有任何建议或者需求,欢迎随时[联系作者QQ](http://wpa.qq.com/msgrd?v=3&uin=513342800&site=qq&menu=yes),或者提issue.

## 开发环境

Node.js

## 安装

```bash
# 安装依赖模块
npm install
# 构建
npm run build
```

## 用法

1. 首先我们定义一个xlsx数据表格文件. 内容如下

| id         |	    name|	   effect|
| :-----:    | :----: | :-----:|
| id	       | 名字 |	   效果|
| number |	string	| list\<number>|
|1	         |     牛肉丸	|  0
| 2	         |    大力丸	|   4
  
excel的格式必须符合一些要求. 他的前3行主要是描述内容,是一些必要字段.  第一行是转化为ts后的字段名字 ,第二行是介绍,也就是注释. 第三行是他的类型.插件会以id为键值.
目前只支持4种类型  number, string ,List\<number>,List\<string>

2. 配置完毕并且安装了插件之后后,打开excel2ts.
需要配置2个地址. 生成配置文件的地址和excel文件的地址.
前者建议使用一个单独的文件夹. **一定要注意,在开始生成时会清空配置文件夹下所有的文件.**
点击生成,会在设置的文件夹下生成一连串的ts文件.此时如果没有任何错误,恭喜你,生成成功.如果有错误,请检查数据表字段的数据类型

3. 在程序中 使用 DataManager 进行数据的调用.

此插件支持一个表格多个sheet. 多个sheet的处理方式 和多个表格一致.

## 还有
1. 插件时根据sheet名字来命名ts类的名字 
2. 可以使用 *中文名\<English>* 的形式来命名sheet名字,程序只会读取英文部分
3. 本插件会自动监视excel路径下的改动,实时生效
4. 一行数据除了id外, 数据为空的时候统一 设置为null
5. 程序是根据小王子的excel-killer魔改而来,借鉴部分主要是excel 操作
