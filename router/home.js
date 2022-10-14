const Router = require('koa-router');
const home = new Router();
const db = require('../utils/db.js');

// 这里的 '/' 就是指向 index.js 中的 /home
// home.get('/', async (ctx) => {
//     ctx.body = "首页";
// })
home
    // 页面底部外链
    .get('/', async (ctx) => {
        let data = await new Promise((resolve, reject) => {
            let sqlLang = `select * from banner`;
            db.query(sqlLang, (err, data) => {
                if (err) reject(err);
                resolve(data); // 返回拿到的数据
            })
        })
        // ctx.body = data;
        // ctx.body = `<img src='${data[0].imgUrl}'></img>`
        // ctx.body = `<% for (var i = 0; i < data.length; i++) { %>
        //     <li>
        //         <img src='${data[i].imgUrl}'></img>
        //     </li>
        // <% } %>`
        console.log(data);
        let str = '<h1>首页</h1>'
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            str += `<img src='${data[i].imgUrl}' style="width: 100px;"></img>`
        }
        console.log(str);
        str += `<a href="./index.html">登录去</a>`
        ctx.body = str
    })

module.exports = home;