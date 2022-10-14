const Koa = require('koa2');
const app = new Koa();
const port = 9000;
const router = require('./router/index')
const errorPage = require('./router/errorPage')
const errorHandler = require('./utils/errorHandler.js');
const cors = require('koa2-cors');// 配置中间件
const path = require('path')
const static = require('koa-static')
// const bodyParser = require('koa-bodyparser')

// 正常页面跳转
app.use(router.routes(), router.allowedMethods());

// 匹配不到页面的全部跳转去404，即为errorPage文件
router.use('/404', errorPage.routes(), errorPage.allowedMethods());
app.use(async (ctx, next) => {
    await next();
    // console.log(parseInt(ctx.status));
    // if (parseInt(ctx.status) === 404) {
    //     ctx.response.redirect("/404")
    // }
})
app.use(static(path.join(__dirname+'/assets')));

app.use(cors());
app.use(router.routes(), router.allowedMethods());
errorHandler(app);
app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})