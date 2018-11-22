(function(){    
    const path = require('path')
    const {ipcRenderer} = require('electron')
    const basePath=__dirname+'/';
    module.exports.SystemModules=(name)=>{
        return require(name);
    }
    module.exports.SelfModules=(name)=>{
        switch(name){
            case 'urlRewriter':return require(basePath+'UrlRewriter.js');
            case 'cryptoHelper':return require(basePath+'CryptoHelper.js');
            case 'DbHelper':return require(basePath+'DbHelper.js');
        }
    }
    module.exports.SelfService=(moduleName,serviceName)=>{
        debugger;
        var rootPath = path.join(__dirname,'../')
        return require(rootPath+'app/modules/'+moduleName+'/Service/'+serviceName+'Service.js')
    }

})(); 