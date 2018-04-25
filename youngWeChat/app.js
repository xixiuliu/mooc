App({
  //登录
 onLaunch: function() {
    // wx.login({
    //     success: res => {
    //         //发送res.code到后台换取oppenId,sessionKey,unionId
    //     }
    // }),
    //获取用户信息
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo;
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }
                    }
                })
            }  
        }
    })
 },
  globalData: {
      g_isPlayingMusic: false,//判断音乐是否播放
      g_currentMusicPostId: null,//判断是哪首音乐在播放
      userInfo: null,
      doubanBase: 'http://t.yushu.im'
  },
})

