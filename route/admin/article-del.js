const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 根据id删除用户 
    await Article.findOneAndDelete({ _id: req.query.id });
    // 重定向到文章列表页面
    res.redirect('/admin/article');

}