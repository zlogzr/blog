// 导入Article数据集合
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 标识 标识文章管理页面
    req.app.locals.currentLink = 'article';
    // 根据是否传递id 渲染不同的页面
    const { id, message } = req.query;
    // 如果传递了id 修改操作
    if (id) {
        // 根据id 获取对应的集合
        let article = await Article.findOne({ _id: id });
        // 渲染(修改的)文章编辑页面
        res.render('admin/article-edit', {
            article: article,
            button: '修改',
            link: '/admin/article-modify?id=' + id,
            message
        });
    }
    else {
        // 没有传递id 添加操作
        res.render('admin/article-edit', {
            button: '添加',
            link: '/admin/article-add',
            message
        });
    }
}