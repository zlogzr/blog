// 导入用户集合User,validateUser方法
const { User, validateUser } = require('../../model/user');
// 导入bcryptjs加密模块(下载)
const bcrypt = require('bcryptjs');


module.exports = async (req, res, next) => {
    // 验证
    try {
        await validateUser(req.body);
    } catch (e) {
        // 重定向  
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        // 将对象类型数据转换成字符串类型数据
        // JSON.stringify()
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    // 用户已存在
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已存在`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已存在' }));
    }
    // 对密码加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}