// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');


module.exports = async (req, res) => {
    // 获取get请求参数的id
    const id = req.query.id;
    // 根据id查询对应的文章数据
    let article = await Article.findOne({ _id: id }).populate('author');
    // 根据id查询对应的评论数据
    let comments = await Comment.find({ aid: id }).populate('uid');
    // 渲染文章详情页面
    res.render('home/article', { article, comments });
}