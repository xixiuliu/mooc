var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (options) {
        var postId = options.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        // 数据绑定
        this.setData({
            postData: postData
        });


        //收藏功能
        var postsCollected = wx.getStorageSync("posts_collected");
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collectrd: postCollected
            })
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync("posts_collected", postsCollected);
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor();

    },

    setMusicMonitor: function () {
        //监听音乐播放
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        })
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
        wx.onBackgroundAudioStop(function(){
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
    },

    //收藏的点击事件
    onCollectionTap: function () {
        this.getPostCollectedSync();//同步调用
        // this.getPostCollectedAsy();//异步调用
    },
    //异步方法
    getPostCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: 'posts_collected',
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                //收藏变未收藏，未收藏变收藏
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToast(postsCollected, postCollected);
            }
        })
    },
    //同步方法
    getPostCollectedSync: function () {
        var postsCollected = wx.getStorageSync("posts_collected");
        var postCollected = postsCollected[this.data.currentPostId];
        //收藏变未收藏，未收藏变收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        this.showToast(postsCollected, postCollected);
    },

    showModal: function (postsCollected, postCollected) {
        var that = this;
        wx.showModal({
            title: '收藏',
            content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
            showCancel: 'true',
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确定',
            confirmColor: '#405f80',
            success: function (res) {
                if (res.confirm) {
                    //更新文章是否缓存
                    wx.setStorageSync("posts_collected", postsCollected);
                    //更新数据绑定，实现图片的切换
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },
    showToast: function (postsCollected, postCollected) {
        //更新文章是否缓存
        wx.setStorageSync("posts_collected", postsCollected);
        //更新数据绑定，实现图片的切换
        this.setData({
            collected: postCollected
        })
        //提示框
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消收藏",
            duration: 1000
        })
    },
    onShareTap: function (event) {
        var itemList = [
            "分享到微信",
            "分享到朋友圈",
            "分享到qq"
        ]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // tapIndex返回数组元素的序号，从0开始
                // cancel用户是否点击了取消按钮，布尔值
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '用户是否取消?' + res.cancel + "现在无法实现分享功能，什么时候可以实现不清楚",
                })

            }
        })
    },
    //音乐播放
    onMusicTap: function () {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic//???
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                //只能用网络地址   
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            })
        }
    }
})