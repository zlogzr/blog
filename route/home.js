// 引用express框架
const express = require('express');



// 创建博客展示页面路由
const home = express.Router();
// 渲染博客首页页面
home.get('/', require('./home/index'));
// 渲染博客详情页页面
home.get('/article', require('./home/article'));

// 创建评论功能
home.post('/comment', require('./home/comment'))

// 将路由对象作为模块成员进行导出
module.exports = home;