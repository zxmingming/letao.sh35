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

        // 获取 id, 设置给隐藏域
        var id = $(this).data('id');
        // console.log(id);
        
        // 设置给隐藏域
        $('[name="categoryId"]').val( id );

        // 只要给隐藏域赋值了, 此时校验状态应该更新成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
        
    });



    // 5. 完成文件上传初始化 => 使用jquery fileupload插件(实现文件上传)
    $('#fileupload').fileupload({
        dataType: 'json',
        // 文件上传完成时的回调函数
        done: function( e, data) {
            // console.log(data);
            var result = data.result; // 后台返回的结果
            var picUrl = result.picAddr; // 获取返回的图片路径
            // 设置给 img src
            $('#imgBox img').attr('src', picUrl);

            // 把路径赋值给 隐藏域
            $('[name="brandLogo"]').val(picUrl);

            // 只要隐藏域有值了, 就是更新成成功状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });


    // 6. 直接进行表单校验
    $('#form').bootstrapValidator({

        // 配置 excluded 排除项, 对隐藏域完成校验
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置校验字段列表
        fields: {
            // 选择一级分类
            categoryId: {
                // 校验规则
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            // 请输入二级分类
            brandName: {
                // 校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        // 提示信息
                        message: '请输入二级分类名称'
                    }
                }
            },
            // 二级分类图片
            brandLogo: {
                // 校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        // 提示信息
                        message: '请选择图片'
                    }
                }
            }
        }

    });


    // 7. 注册表单校验成功事件, 阻止默认的提交, 通过ajaz提交
    $('#form').on('success.form.bv', function( e ) {
        // 阻止默认的提交
        e.preventDefault();

        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            // 表单序列化, 自动将所有配置了 name 属性的 input 值进行拼接, 用于提交
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ) {
                // console.log(info);
                if (info.success) {
                    // 添加成功
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 页面重新渲染, 第一页
                    currentPage = 1;
                    render();

                    // 将表单元素重置 (内容和状态都重置)
                    $('#form').data('bootstrapValidator').resetForm(true);

                    // button 和 img 不是表单元素, 手动设置
                    $('#dropdownText').text('请选择一级分类');
                    $('#imgBox img').attr('src', './images/none.png');
                }
            }
        })
        
    })

})