const {createHash} = require('./createHash.js')

function verifySignature(payload,secret,verifiedHash){
    const newHash=createHash(payload,secret);
    return verifiedHash===newHash
}

module.exports={
    verifySignature
}
