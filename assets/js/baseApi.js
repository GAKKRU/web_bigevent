$.ajaxPrefilter(function (options) { 
   
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my') != -1) { 
        options.headers = {
        Authorization: localStorage.getItem('token')||''
        }
    }

    //全局统一挂载compete对象
    options.complete = function (res) {
        if (res.responseJSON.status == 1) {
                location.href='login.html'
             }
    }
    
})