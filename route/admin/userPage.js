// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入mongoose-sex-page第三方模块(方法)
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {
    // 标识 标识用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收get请求参数page的值
    const page = req.query.page;
    // 查询用户数据
    let users = await pagination(User).page(page).size(5).display(5).find().exec();
    // 渲染用户列表页面
    res.render('admin/user', { users });
}
