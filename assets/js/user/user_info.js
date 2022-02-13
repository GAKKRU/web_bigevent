$(function () {
    //自定义的验证规则
    var form = layui.form
    form.verify({
        nickname:[/^[\S]{1,6}$/,'用户昵称必须在1~6个字符']
    })
    initUserInfo()
    //重置表单数据
    $('#btnReset').click(function (e) { 
        e.preventDefault();
        initUserInfo()
    })
    
    
    $('.layui-form').submit(function (e) { 
        e.preventDefault();
        var data = $('.layui-form').serialize()
        console.log(data);
        infoUpdata(data)
        
        initUserInfo()
        
    })

})

//初始化 用户信息
function initUserInfo() { 
   
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) { 
                console.log('ok');
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            layui.form.val('formUserInfo', {
                'username': res.data.username,
                'nickname': res.data.nickname,
                'email': res.data.email,
                'id':res.data.id
            })
         }

    })
}
function infoUpdata(data) {
    
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: data,
        success: function (res) { 
            console.log(res);
        }
        
    })
}
