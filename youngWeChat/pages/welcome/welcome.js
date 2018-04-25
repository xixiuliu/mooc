//获取应用实例
const app = getApp();

Page({
    data: {
        userInfo: {}
    },
    onTap: function(){
        wx.switchTab({
            url: '../posts/posts'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            console.log(app.globalData.userInfo)
            this.setData({
                userInfo: app.globalData.userInfo
            })
        } else {
            console.log('没有')
            console.log(app.globalData.userInfo)
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo
                    })
                }
            })
        }
    },
})