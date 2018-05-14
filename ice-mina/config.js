const { resolve } = require('path')
const r = url => resolve(__dirname, url);
const assetsPath = resolve(process.cwd(), './mina')

module.exports = {
    "json": {
        "pages":[
            "pages/index/index",
            "pages/logs/logs"
        ],
        "tabBar": {
            "color": "#000000"
        }
    },
    "window":{
        "backgroundTextStyle":"light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle":"black"
    },
    "assetsPath": assetsPath,
    "app": r('./app.js')
}
