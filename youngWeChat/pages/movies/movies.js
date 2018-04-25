// pages/movies/movies.js
var util = require('../../util/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult:{},
        inputValue:'',
        containerShow: true,
        searchPanelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';//起始页数和api条数（第0页起的三条数据）
        const comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
        const top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
        //使用this来调用自己写的函数
        this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
        this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
        this.getMovieListData(top250Url, 'top250', 'Top250');

    },
    onMoreTap: function (e) {
        var category = e.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movies/more-movies?category=' + category
        })
    },
    onMovieTap: function(e){
        var movieId = e.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id=' + movieId
        })
    },
    getMovieListData: function (url, settedKey, categoryTitle) {
        let that = this;
        //请求是个异步方法
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'content-type': 'json'
            },
            success: res => {
                that.processDoubanData(res.data, settedKey, categoryTitle);

            },
            fail: error => {
                console.log('error')
            }
        })
    },

    onCancelImgTap: function(event){
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            searchResult:{},
            inputValue:''
        })
    },
    //serach
    onBindFocus: function(event){
        this.setData({
            containerShow:false,
            searchPanelShow:true
        })
    },
    onBindChange:function(event){
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" +text;
        this.getMovieListData(searchUrl,"searchResult","");
    },
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        let movies = [];
        for (let idx in moviesDouban.subjects) {
            // idx是moviesDouban.subjects的属性名，moviesDouban.subjects[idx]是moviesDouban.subjects的属性值
            //而且遍历出来是乱序的
            let subject = moviesDouban.subjects[idx];
            let title = subject.title;
            if (title.length > 6) {
                title = title.substring(0, 6) + "...";
            }
            let temp = {
                stars: util.converToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id//需要跳转到详情页的时候使用
            }
            movies.push(temp);
        }
        //这里为什么可以用this而不是that
        //因为在调用processDoubanData这个函数的时候，是用的that调用的，那么此时，下面的this指代的自然就是这个that

        let readyData = {};
        // readyData[settedKey] = movies;
        readyData[settedKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        }
        this.setData(readyData);

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