const { User } = require('../../model/user');
// 导入bcryptjs
const bcrypt = require('bcryptjs');


module.exports = async (req, res, next) => {
    // 接收客户端post传递的请求参数
    const { username, email, role, state, password } = req.body;
    // 接收客户端get传递的请求参数id
    const id = req.query.id;
    // 将用户信息从数据库中查询出来
    const user = await User.findOne({ _id: id });
    // 比对密码
    let isValid = await bcrypt.compare(password, user.password);
    // 密码比对成功
    if (isValid) {
        // 将用户信息更新到数据库中
        await User.update({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state,
        });
        // 重定向用户列表页面
        res.redirect('/admin/user')
    } else {
        // 密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码错误，不能进行用户信息修改', id: id }
        next(JSON.stringify(obj));
    }

}