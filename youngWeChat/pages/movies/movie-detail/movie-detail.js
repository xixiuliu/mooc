var util = require('../../../util/util.js');
var app = getApp();
Page({
    data: {
        movie: {}
    },
    onLoad: function (options) {
        var movieId = options.id;
        var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
        util.http(url, this.processDoubanData);
    },
    //查看图片
    viewMoviePostImg: function(e){
        var src= e.currentTarget.dataset.src;
        wx.previewImage({
            current: src,
            urls: [src],
        })
    },
    processDoubanData: function (data) {
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large;
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",//三元表达式
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentscount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: util.converToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),//影人信息
            castsInfo: util.convertToCastInfos(data.casts),
            summary: data.summary
        }
        this.setData({
            movie:movie
        })
    }
})