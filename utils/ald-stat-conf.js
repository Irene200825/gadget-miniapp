var config=require('../config.js')
exports.app_key = config.ald_app_key; //请在此行填写从阿拉丁后台获取的appkey
exports.getLocation = false; //默认不获取用户坐标位置
exports.appid = ""; //用于用户登录、微信转发群信息、二维码等微信官方功能
exports.appsecret = "";//用于用户登录、微信转发群信息、二维码等微信官方功能
exports.defaultPath = 'pages/hot-sell/index';//小程序的默认首页, 用于分享时path为空时
exports.plugin = true;  //您的小程序中是否使用了插件。根据是否启用插件会有不同的接入方式，请参考文档文档。