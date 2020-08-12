// 创建用户集合
const mongoose = require('mongoose');
// 导入bcryptjs
const bcrypt = require('bcryptjs');
// 导入joi
const Joi = require('joi');


// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱不重复
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        require: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});
// 创建用户集合
const User = mongoose.model('User', userSchema);
async function createUser() {
    // 密码加密处理
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'zlog',
        email: 'zlog@zlog.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}
// 初始化
// createUser();

// 对用户进行操作时 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法')),
    };
    // 实施验证
    return Joi.validate(user, schema);

};


// 将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
}