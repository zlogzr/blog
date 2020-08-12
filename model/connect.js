// 连接数据库
// 导入mongoose第三方模块(对象)
const mongoose = require('mongoose');
// 导入config第三方模块(对象)
const config = require('config');
// console.log(config.get('db.user'));

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(() => {
        console.log('数据库连接失败');
    });
