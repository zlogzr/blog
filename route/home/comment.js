// 导入评论集合
const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
    // 获取post请求数据
    const { content, aid, uid } = req.body;
    // 将评论信息存储在评论集合中
    await Comment.create({
        aid: aid,
        uid: uid,
        content: content,
        time: new Date()
    });
    // 重定向到文章详情页面
    res.redirect('/home/article?id=' + aid)
}