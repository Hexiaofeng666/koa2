const Router = require('koa-router');
const list = new Router();
const fs = require('fs');
const { resolve } = require('path');


list.get('/', async (ctx) => {
    // ctx.body = "列表页";
    // 测试读取vue.txt文件
    let data = `<h1>登录失败页面</h1>`
    data += await new Promise((resolve, reject)=>{
        fs.readFile(`./assets/vue.txt`, (err, data) => {
            if (err) reject(err);
            // console.log(data.toString()); // 这里读取到的文件是二进制文件流，因此要转字符串
            resolve(data.toString())
        })
    })
    data += `<a href="../index.html">登录去</a>`
    ctx.body = data
})
module.exports = list;