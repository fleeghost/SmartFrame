(function(){
    const {ipcRenderer} = require('electron')
    const {SystemModules,SelfModules,SelfService} = require(ipcRenderer.sendSync('getRootPath')+'/assembly/RequireHelper.js')
    const db = SelfModules('DbHelper');
    const cryptoHelper = SelfModules('cryptoHelper');

    module.exports.login =(username,pwd)=>{
        pwd = cryptoHelper.md5(pwd);
        db.SF_User.findAll({
            where:{
                Name:username,
                Pwd:pwd
            }
        }).then(result=>{
            console.log(result);
        });



    }

})()



