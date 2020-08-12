const user = require("../model/user");

const guard = (req, res, next) => {
    // 没有登录且访问非登陆页面 重定向登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    }
    // 登录状态 请求放行
    else {
        // 判断用户角色 
        if (req.session.role == 'normal' && req.url != '/login') {
            return res.redirect('/home');
        }
        next();
    }
}
module.exports = guard;
