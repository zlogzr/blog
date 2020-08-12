const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 根据id删除用户 
    await User.findOneAndDelete({ _id: req.query.id });
    // 重定向到用户列表页面
    res.redirect('/admin/user');

}