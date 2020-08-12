// 引入formidable第三方模块(对象)
const formidable = require('formidable');
// 引入path模块
const path = require('path');
// 导入文章集合
const { Article, validateArticle } = require('../../model/article');


module.exports = (req, res, next) => {
    // 获取要修改的文章id
    const id = req.query.id;
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err, fields, files) => {
        // 验证 修改的表单数据
        try {
            await validateArticle(fields);
        } catch (e) {
            // 重定向
            // return res.redirect(`/admin/article-edit?message=${e.message}`)
            // 将对象类型数据转换成字符串类型数据 JSON.stringify()
            return next(JSON.stringify({ path: `/admin/article-edit`, message: e.message, id: id }));
        }
        // res.send(files.cover.path.split('public')[1]);
        // res.send(files);
        await Article.update({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 将页面重定向到文章列表页面
        res.redirect('/admin/article');
    });

}