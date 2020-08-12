// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs');


module.exports = async (req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // 如果邮件地址或密码为空(重新验证 因为客户端可禁用js)
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
    }
    // 根据邮箱地址 查询用户信息
    let user = await User.findOne({ email });
    // 邮箱存在
    if (user) {
        // 比对密码
        // 创建用户时密码已经加密
        let isValid = await bcrypt.compare(password, user.password);
        //密码正确
        if (isValid) {
            // 将用户名存储在请求对象中 保存登陆状态(重要)(其他模块可调用)
            req.session.username = user.username;
            // 将用户角色存储在请求对象中 
            req.session.role = user.role;
            // 将用户对象存储在userInfo (模板可调用)
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 管理员登陆 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 普通用户登陆 重定向到博客首页页面
                res.redirect('/home')
            }

        }
        // 密码错误
        else {
            res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
        }
    }
    // 邮箱不存在
    else {
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }
};

