// 引入mongoose模块
const mongoose = require('mongoose');
// 导入joi第三方模块(验证)(方法)
const Joi = require('joi');


// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        require: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

// 根据集合规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 对用户进行操作时 验证用户信息
const validateArticle = article => {
    // 定义对象的验证规则
    const schema = {
        title: Joi.string().min(2).max(20).required().error(new Error('标题不符合验证规则')),
        author: Joi,
        publishDate: Joi,
        cover: Joi,
        content: Joi


    };
    // 实施验证
    return Joi.validate(article, schema);
};


// 导出
module.exports = {
    Article,
    validateArticle
}