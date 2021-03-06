// -----------------------------------登录页功能
$(function() {

    // 1. 登录页面, 用户点击登录, 获取用户名和密码
    // 发送ajax请求, 完成登录

    $('#loginBtn').click(function() {
        // console.log(11);
        

        // 获取用户名和密码
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if (username === "") {
            mui.toast('请输入用户名');
            return;
        }
      
        if (password === "") {
            mui.toast('请输入密码');
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                if (info.error === 403) {
                    mui.toast('用户名或者密码错误');
                    return;
                }

                if (info.success) {
                    // 登录成功
                    // (1) 如果有参数, 需要跳回去
                    // (2) 如果没有参数, 正常跳转用户中心
                    if (location.search.indexOf('retUrl') != -1) {
                        // 有参数, 获取传递过来的地址, 跳回去
                        // location.search => ?retUrl=http://localhost:3000/front/product.html?productId=7
                        var retUrl = location.search.replace('?retUrl=', '');

                        // 得到地址, 跳回去
                        location.href = retUrl;
                    }else {
                        // 没有参数
                        location.href = 'user.html';
                    }
                }
            }
        })

    });

})