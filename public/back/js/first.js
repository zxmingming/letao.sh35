//----------------------------------------分类管理的一级分类的功能
$(function() {

    // 1. 一进入页面, 应该发送 ajax 请求, 获取数据, 动态渲染 (使用模板引擎插件)
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                var htmlStr = template('firstTpl', info);
                $('tbody').html(htmlStr);

                // 2. 完成分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPage: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function(a,b,c,page) {
                        // 更新当前页, 并且重新渲染
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

})