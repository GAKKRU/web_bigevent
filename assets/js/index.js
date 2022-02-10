$(function () { 
    //获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        //清除token+跳转到登录页
            localStorage.removeItem('token')  
            location.href='login.html'    
        layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        method: 'GET',
        //header就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status != 0) {
                return alert('请求失败')
            }
            //渲染头像
            renderAvatar(res.data)
        },
        //
        // complete: function (res) { 
        //     console.log(res);
        //     if (res.responseJSON.status == 1) {
        //         location.href='login.html'
        //      }
        // }
        
    })
}
function renderAvatar(data) {
    //获取用户的昵称
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (data.user_pic != null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
         $('.text-avatar').html(first)
     }

}
