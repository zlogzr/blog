
// 引用express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-template模块(下载express-art-template时也下载了art-template)
const template = require('art-template');
// 导入dateFormat第三方模块(方法)(处理日期格式)
const dateFormat = require('dateFormat');
// 导入morgan第三方模块(方法)(获取客户端发送到服务器端的请求信息)
const morgan = require('morgan');
// 导入config第三方模块(对象)(根据环境配置)
const config = require('config');


// 创建网站服务器
const app = express();
// 连接数据库
require('./model/connect');
// 配置post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));




// 获取系统环境变量 返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    // app.use(morgan('dev'));
} else {
    // 当前是生产环境
    console.log('当前是生产环境');
}



// 告诉express框架模板所在的位置(配置)
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dataFormat变量
template.defaults.imports.dateFormat = dateFormat;



// 引入二级路由模块
const home = require('./route/home');
const admin = require('./route/admin');


// 拦截请求 判断用户登录状态 
// 注意：放在开放静态资源文件之后 匹配二级路由之前
app.use('/admin', require('./middleware/loginGuard'));


// 为二级路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);
app.use('/', home);







// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串转换成对象 JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});



// 监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');
