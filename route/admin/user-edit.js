const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 标识 标识用户管理页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    // 如果传递了id 修改操作
    if (id) {
        // 获取对应的集合
        let user = await User.findOne({ _id: id });
        // 渲染用户编辑页面(修改)
        res.render('admin/user-edit', {
            msg: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    }
    else {
        // 添加操作
        res.render('admin/user-edit', {
            msg: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

}