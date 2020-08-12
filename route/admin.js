// 引用express框架
const express = require('express');


// 创建博客管理页面路由
const admin = express.Router();
// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登陆功能
admin.post('/login', require('./admin/login'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 渲染用户列表页面
admin.get('/user', require('./admin/userPage'));

// 渲染用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 实现添加用户功能
admin.post('/user-edit', require('./admin/user-edit-add'));

// 实现修改用户信息功能
admin.post('/user-modify', require('./admin/user-modify'));

// 实现删除用户功能
admin.get('/delete', require('./admin/user-delete'));



// 渲染文章列表页面
admin.get('/article', require('./admin/article'));

// 渲染文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能
admin.post('/article-add', require('./admin/article-add'));

// 实现文章删除功能
admin.get('/article-del', require('./admin/article-del'));

// 实现文章修改功能路由
admin.post('/article-modify', require('./admin/article-modify'));








// 将路由对象作为模块成员进行导出
module.exports = admin;