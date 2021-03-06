$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
    $image.cropper(options)
    
//iuput:file隐藏用click（）自动实现点击事件
    $('#chooseimg').on('click', function (e) {
       
        $('#file').click()
    })
    $('#file').on('change', function (e) { 
        if (e.target.files.length==0) { 
            console.log('ok1');
            return layui.layer.msg('请选择照片！')
        }
        console.log(e);
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)        

    })
    $('#btnUpload').on('click', function (e) { 
        e.preventDefault();
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar:dataURL
            },
            success: function (res) { 
                console.log(res);
            }
        })
    })
})