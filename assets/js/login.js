$(function () {
    // 点击去注册 隐藏登录页面 显示注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录 隐藏注册页面 显示登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui 中获取form对象
    var form = layui.form
    // 通过form.verify函数自定义校验规则
    form.verify({
        // 自定义用户名 密码验证
        yhm: [/^[a-zA-Z0-9_-]{3,18}$/],
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 确认密码框
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一样'
            }
        }
    })
    // 从layui 中获取layer
    var layer = layui.layer
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // 快速获取表单数据
        var data = $(this).serialize()
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录', function () {
                $('#link_login').click();
            })
        })
    })
    // 监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})