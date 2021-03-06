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
                    totalPages: Math.ceil(info.total / info.size),
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


    // 3. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function() {
        // 显示添加模态框
        $('#addModal').modal('show');
    });


    // 4. 完成添加校验 => 校验一级分类名称
    $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置需要校验的字段列表
        fields: {
            // 校验一级分类名称, 对应name表单的name属性
            categoryName: {
                // 配置校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        // 提示信息
                        message: '请输入一级分类名称'
                    }
                }
            }
        }

    });



    // 5. 注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交即可
    $('#form').on('success.form.bv', function( e ) {
        // 阻止默认的提交
        e.preventDefault();

        // 通过 ajax 提交
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            // 表单序列化, 自动将所有配置了 name 属性的 input 值进行拼接, 用于提交
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ) {
                // console.log(info);
                if (info.success) {
                    // 说明添加成功
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 重新渲染页面, 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 将表单的内容和状态都要重置 => 重置内容和状态 resetForm(true)
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })


})