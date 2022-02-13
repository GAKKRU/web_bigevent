$(function () { 
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samePwd: function (value) { 
            if (value == $('[name="oldPwd"]').val())
                return '新旧密码不能相同！'
        
        },
        rePwd: function (value) { 
            if (value !== $('[name="newPwd"]').val()) { 
                return '两次密码不一致！'
            }
        }
       
          
    })
    //发送请求
    $('.layui-form').on('submit', function (e) { 
        e.preventDefault();
        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data:data,
            success: function (res) { 
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                } else if (res.status == 1) {
                    layui.layer.msg('原密码错误！')
                } else { 
                    layui.layer.msg('更新密码成功！')
                    $('.layui-form')[0].reset()
                }
                
            }
        })
    })
})