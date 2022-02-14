$(function () { 
    //定义一个查询参数，
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state:''
    }
    //定义一个时间过滤器
    template.defaults.imports.dataFormat = function (data) { 
        const dt = new Date(data)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate())
        
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
    }
    //定义补0的方法
    function padZero(n) { 
        return n>9?n:'0'+n
    }
    initTable()
    initCate()
    $('#form-search').on('submit', function (e) { 
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
        
    })
    $('tbody').on('click', '.btn-delete', function (e) { 
        var id = $(this).attr('data-id')
        layui.layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
        //do something
            
           console.log(id);
            $.ajax({
                url: '/my/article/delete/'+id,
                method: 'GET',
                success: function (res) { 
                    if (res.status !== 0) {
                    return llayui.layer.msg('删除文章失败！')
                }
                    layui.layer.msg('删除文章成功！')
                    initTable()
                
                }
            })
        layer.close(index);
        });
    })




    //获取文章数据
    function initTable() { 
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data:q,
            success: function (res) { 
                if (res.status !== 0) { 
                    return layui.layer.msg('获取失败')
                }
                //使用模板引擎渲染数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                //res.total为多少列数据
                renderPage(res.total)
            }
        })
    }
    //定义渲染分页的方法
    function renderPage(total) { 
        console.log(total);
        //调用方法渲染分页的结构
        layui.laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count','limit', 'prev', 'page', 'next','skip'],
            limits:[2,3,5],
            // 分页发生切换的时候，触及jump回调
            jump: function (obj,first) { 
                q.pagenum = obj.curr
                q.pagesize=obj.limit
                if (!first) { 
                    initTable()
                }


    
            }
        })
    }
    
})
function initCate() { 
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function (res) { 
            console.log(res);
            var htmlSrc = template('tpl-cate', res)
            $('[name="cate_id"]').html(htmlSrc)
            layui.form.render()
        }
    })
}

