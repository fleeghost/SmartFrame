(function(){
    const crypto = require('crypto');
    module.exports.md5 = (data)=>{
        const hash = crypto.createHash('md5');
        hash.update(data);
        return hash.digest('hex')
    }

})()