const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Routers = require('./routes/index');
const util = require('./utils');
const cors = require('koa-cors');
const jwt = require('koa-jwt');
const secret  = require('./config/secret');
const JWTToken = require('./middleware/JWTToken');
//开启jwt验证
//app.use(JWTToken());
app.use(cors());
//注册和登录不需要验证
// app.use(jwt({secret: secret.sign}).unless({
//     path: [
//         // 注册
//         /^\/api\/v1\/user\/register/,
//         // 登录
//         /^\/api\/v1\/user\/login/,
//     ]
// }))

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// routes 注册路由
//app.use(Routers.routes(), Routers.allowedMethods());
util.addRoutes.call(app,Routers); //注册路由

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
