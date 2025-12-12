const {createHmac} = require('node:crypto');

function createHash(payload,secret){
    const hash=createHmac('sha256',secret).update(payload).digest('hex');
    return hash;
}

module.exports={
    createHash
}