$(function () {
    // 点击去注册
    $('#link_reg').on("click", function (e) {
        $(".login-box").hide()
        $(".reg-box").show()
     }
    )
    // 点击去登录
    $('#link_login').on("click", function (e) {
        $(".reg-box").hide()
        $(".login-box").show()
     }
    )
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交
    $('#form_reg').on('click', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password:$('.reg-box [name=password]').val()
        }
        
        $.post('/api/reguser', data, function (res) { 
        if (res.status !== 0) {
         return console.log(res.message);
            }
            alert("注册成功")
            // 成功后用程序模拟点击登录行为
            $('#link_login').click()
        })
        
 
    })
    // 监听登录表单的提交事件
     $('#form_login').submit(function(e) {
    // 阻止默认提交行为
      e.preventDefault()
      console.log($(this).serialize());
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return console.log('登录失败');
        }
          console.log('登录成功');
          console.log(res.token);
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = 'index.html'
      }
    })
  })

        

})