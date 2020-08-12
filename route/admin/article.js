// 将文章集合的构造函数导入
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块(下载方法)
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {
    // 标识 标识文章管理页面
    req.app.locals.currentLink = 'article';

    // 接收客户端传递过来的页码
    const page = req.query.page || 1;
    // 获取文章集合所有文章数据 (多集合联合查询)(分页)
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    // res.send(articles);
    // 渲染文章列表页面
    res.render('admin/article', {
        articles
    });
};


