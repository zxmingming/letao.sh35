//----------------------------------------分类管理的一级分类的功能
$(function() {

    // 1. 一进入页面, 应该发送 ajax 请求, 获取数据, 动态渲染 (使用模板引擎插件)
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条

    render(); // 完成渲染

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize  
            },
            dataType: 'json',
            success: function( info ) {
                // console.log(info);
                // 使用模板引擎,调用方法, 动态渲染
                var htmlStr = template('secondTpl' , info);
                $('tbody').html(htmlStr);

                // 2. 实现分页插件的初始化  => 使用分页插件bootstrap-paginator
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function(a, b, c, page) {
                        // 更新当前页
                        currentPage = page;
                        // 并且重新渲染
                        render();
                    }
                })
            }
        })
    }


    // 3. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function() {
        // 显示模态框, 就应该发送请求
        $('#addModal').modal('show');

        // 发送ajax请求, 获取一级分类的全部数据, 将来用于渲染
        // 根据已有接口, 模拟获取全部数据的接口, page:1, pageSize: 100
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1, 
                pageSize: 100
            },
            dataType: 'json',
            success: function( info ) {
                // console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });


    // 4. 给下拉菜单添加可选功能
    // 事件委托
    $('.dropdown-menu').on('click', 'a', function() {
        // 获取 a 的文本
        var txt = $(this).text();
        // console.log(txt);
        // 设置给 button 按钮
        $('#dropdownText').text(txt);
        
    })

})