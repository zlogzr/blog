// 导入文章集合
const { Article } = require('../../model/article');
// 导入mongoose-sex-page第三方模块(方法)(分页)
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {

    // 获取请求页数
    const page = req.query.page;
    // 获取文章数据
    let result = await pagination(Article).find().populate('author').page(page).size(4).display(5).exec();
    // 渲染首页页面
    res.render('home/default', {
        result,
    });
}