// pages/todo/todo.js
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addText: '',
        focus: true,
        num: 0,
        lists: [],
        score: 0
    },
    setInput: function (e) {
        this.setData({
            addText: e.detail.value
        })
    },

    //取消输入
    addTodoClear: function () {
        this.setData({
            focus: false, // 失去焦点
            addText: '' // 清空值
        })
    },
    //添加todo
    addTodo: function () {
        //检查是否输入
        if (!this.data.addText.trim()) {
            return
        } else {
            let temp = this.data.lists;
            console.log(util.formatTime(new Date()));
            let addT = {
                id: util.formatTime(new Date()),//取出当前的时间
                title: this.data.addText
            };
            temp.push(addT);
            this.setData({
                lists: temp,
                num: temp.length,
                addText: ''
            });
        }
    },
    //删除todo
    delete: function (e) {
        let temp = this.data.lists;
        let thisIndex = e.currentTarget.dataset.index;
        let current = temp.splice(thisIndex, 1);
        console.log(current);//此时输出的是temp的返回值
        temp.splice(thisIndex, 1);
        console.log(temp);//此时输出的是操作temp之后的数组
        this.setData({
            lists: temp,
            num: temp.length
        })
    },

    add_score: function (e) {
        // console.log(score);
        var that = this;
        console.log(that.data.score)
        that.setData({
            score: 200
        })
        const score_back = that.data.score;
        console.log(score_back);
        var i = 0;
        var temp = Math.floor(score_back/30);
        var end = setInterval(function () {
            i=i+temp;
            console.log(i);
            that.setData({
                score: i
            })
            if (that.data.score >= score_back) {
                clearInterval(end);
                that.setData({
                    score: score_back
                })
            }
        }, 10)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.add_score()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})