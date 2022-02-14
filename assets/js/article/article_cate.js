$(function () { 
    //获取文章分类列表
    initArtCateList()
    var indexAdd=null
    $('#btnAddCate').on('click', function (e) { 
        indexAdd= layui.layer.open({
            type: 1,
            area:['500px','250px'],
            title: '添加文章分类',
            content:$('#dialog-add').html()
        })
    })
    //通过代理方式绑定事件,通过页面已经存在的元素绑定

    $('body').on('submit', '#form-add',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { 
                    return layui.layer.msg('新增文章分类失败！')
                }
    
                initArtCateList()
                layui.layer.msg('新增文章分类成功！')
                layui.layer.close(indexAdd)

             }
        })
    })
    var indexEdit=null
    $('tbody').on('click', '#btn-edit', function (e) {
        indexEdit= layui.layer.open({
            type: 1,
            area:['500px','250px'],
            title: '修改文章分类',
            content:$('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/'+id,
            method: 'GET',
            success: function (res) { 
                layui.form.val('form-edit',res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) { 
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status != 0) { 
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')
                layui.layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click', '#btn-delete', function (e) { 
        e.preventDefault();
        var id = $(this).attr('data-id')
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
        //do something
            $.ajax({
                url: '/my/article/deletecate/'+id,
                method: 'GET',
                success: function (res) { 
                    if (res.status !== 0) { 
                        layui.layer.msg('删除失败')
                    }
                    layui.layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()   
                }
            })
            
        });
        
    })

})
function initArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
    
        success: function (res) { 
            console.log(res);
            var htmlSrc = template('tpl-table', res)
            $('tbody').html(htmlSrc)
            
        }
    })
 }