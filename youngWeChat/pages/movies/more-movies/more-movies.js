// pages/movies/more-movies/more-movies.js
var app = getApp();
var util = require('../../../util/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        navigationTitle: '',
        requestUrl:'',
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category;
        this.setData({
            navigationTitle: category
        })
        var dataUrl = '';
        switch (category) {
            case '正在热映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
                break;
            case '即将上映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
                break;
            case 'Top250':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
                break;
        }
        this.setData({
            requestUrl: dataUrl
        })
        util.http(dataUrl, this.processDoubanData);
    },
    onMovieTap: function (e) {
        var movieId = e.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId
        })
    },
    onReachBottom: function (event) {
       //拼接一个字符串
       console.log('aa')
       var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
       util.http(nextUrl, this.processDoubanData);
       wx.showNavigationBarLoading();
    },
    onPullDownRefresh: function(event){
        //一直在请求从0开始的20条数据
        var refreshUrl = this.data.requestUrl + "?start=0&count=20";
        //不清空  数据会重复
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount=0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    processDoubanData: function (moviesDouban) {
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
        //上拉加载电影总数计算,将旧数据和新加载的数据合并到一起。
        var totalMovies={}
        if(!this.data.isEmpty){
            totalMovies = this.data.movies.concat(movies);
        }else{
            totalMovies = movies;
            this.data.isEmpty = false
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },

    onReady: function (event) {
        wx.setNavigationBarTitle({
            title: this.data.navigationTitle
        })
    }
})