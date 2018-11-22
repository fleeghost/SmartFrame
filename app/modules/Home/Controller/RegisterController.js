$(document).ready(function() {
    App.init();
    //注册事件
    $("#btnRegister").click(function () {
        var username = $("#username").val();
        var pwd1 = $("#pwd1").val();
        var pwd2 = $("#pwd2").val();
        if (username == "") {
            layer.alert("请先输入账号");
            return;
        }
        if (pwd1 == "") {
            layer.alert("请先输入密码");
            return;
        }
        if (pwd2 == "") {
            layer.alert("请先输入重复密码");
            return;
        }
        if (pwd1 != pwd2) {
            layer.alert("两次密码不一致");
            return;
        }
        $.post("/Home/Register", {
            username: username,
            pwd1: pwd1,
            pwd2: pwd2
        }, function (data) {
            if (data.status == 500) {
                layer.alert(data.msg);
            }
            else {
                window.location = "/Home/Index";
            }
        }, "json")
    });
});