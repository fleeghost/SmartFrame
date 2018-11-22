(function(){
    const {ipcRenderer} = require('electron')
    const {SystemModules,SelfModules,SelfService} = require(ipcRenderer.sendSync('getRootPath')+'/assembly/RequireHelper.js')
    const db = SelfModules('DbHelper');
    const cryptoHelper = SelfModules('cryptoHelper');

    //登录
    module.exports.login =(username,pwd,callBack)=>{
        pwd = cryptoHelper.md5(pwd);
        db.SF_User.findAll({
            where:{
                Name:username,
                Pwd:pwd
            }
        }).then(result=>{
            callBack(result);
        });
    }
    //注册
    module.exports.register = (user,callBack)=>{
        //查询当前用户名是否存在
        db.SF_User.findAll({
            where:{
                Name:user.username,
                Enabled:0
            }
        }).then(result=>{
            if(result.length==0){
                //开始注册
                db.SF_User.create({
                    Name:user.username,
                    Pwd:cryptoHelper.md5(user.pwd),
                    Telphone:'',
                    HeadImg:'',
                    Sign:'',
                    Enabled:0
                })
                .then(result=>{
                    debugger;
                });
            }
            else{
                callBack({
                    status = 500,
                    msg = "用户名已存在",
                    data = ""
                })
            }
        })
    }


})()



