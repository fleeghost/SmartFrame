const {ipcRenderer} = require('electron')
const {SystemModules,SelfModules,SelfService} = require(ipcRenderer.sendSync('getRootPath')+'/assembly/RequireHelper.js')
const service = SelfService('Home','Base')

$(document).ready(function() {
    App.init();
    LoginV2.init();
    swipPic();
});


//循环滚动背景图片
var swipIndex = 1;
function swipPic() {
    setTimeout(function () {
        $('[data-click="change-bg"]').eq(swipIndex).click();
        swipIndex++;
        if (swipIndex >= 6) {
            swipIndex = 0;
        }
        swipPic();
    }, 5000);
}


function login() {
    var username = $("#username").val();
    var pwd = $("#pwd").val();
    var rememberPwd = ($("#ckRememberPwd").attr("checked") == "checked" ? 1 : 0);
    if (username == "") {
        layer.alert("请先输入账号");
        return;
    }
    if (pwd == "") {
        layer.alert("请先输入密码");
        return;
    }
    service.login(username,pwd,(user)=>{
        if(user.length==0){
            layer.alert('用户名或密码错误');
        }
        else{
            //登录成功
            ipcRenderer.send('setCurrentUser',user[0].dataValues);
        }
    });
}