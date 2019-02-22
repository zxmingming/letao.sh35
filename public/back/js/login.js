$(function() {
    /* 
        1. 进行表单校验配置
        校验要求:
            (1) 用户名不能为空, 长度为2-6位
            (2) 密码不能为空, 长度为6-12位
    */
    
    // 1.1 进行表单校验初始化
    $('#form').bootstrapValidator({
      
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        // 1.2. 字段列表 field, 要先在 input 中配置 name属性
        fields: {
            // 1.2.1 校验用户名，对应name表单的name属性
            username: {
                // 校验规则
                validators: {
                    //不能为空
                    notEmpty: {
                        // 提示信息
                        message: '用户名不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度为2-6位'
                    },
                }
            },
            // 1.2.2 密码
            password: {
                // 校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        // 提示信息
                        message: '密码不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是6-12位'
                    }
                }   
            }
        }
      
    });


    /* 
        2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
           (1) 校验成功, 此时会默认提交, 发生页面跳转, 注册表单校验成功事件, 在事件中阻止默认跳转提交, 通过ajax提交
           (2) 校验失败, 自动拦截提交

           注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交
    */

    // 2.1 注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交
    $('#form').on('success.form.bv',function( e ) {

        // 2.2 阻止默认的提交
        e.preventDefault();
        // console.log('当前默认的表单提交已经被阻止, 我们通过ajax提交');

        // 2.3 发送ajax
        $.ajax({
            type: 'post',
            // 本质上会自动拼接上前面的域名端口  http://localhost:3000/employee/employeeLogin
            url: '/employee/employeeLogin',
            // 表单序列化, 自动将所有配置了 name 属性的 input 值进行拼接, 用于提交
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.error === 1000) {
                    alert('用户名不存在!');
                }
                if (info.error === 1001) {
                    alert('密码错误!');
                }
                if (info.error === 1001) {
                    // 登录成功, 跳转到首页
                    location.href = 'index.html';
                }
            }
        })
        
    })
   
});


