function converToStarsArray(stars) {
    let num = stars.toString().substring(0, 1);
    let array = [];
    for (let i = 1; i <= 5; i++) {
        if (num >= i) {
            array.push(1)
        } else {
            array.push(0)
        }
    }
    return array;
}
function http(url, callBack) {
    //请求是个异步方法
    wx.request({
        url: url,
        method: 'GET',
        header: {
            'content-type': 'json'
        },
        success: res => {
            callBack(res.data);
        },
        fail: error => {
            console.log('error')
        }
    })
}
function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + '/'
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}
function convertToCastInfos(casts) {
    var castsArray = [];
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}
module.exports = {
    converToStarsArray: converToStarsArray,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}