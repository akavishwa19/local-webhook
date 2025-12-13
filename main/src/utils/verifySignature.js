import {createHash} from './createHash.js';

function verifySignature(payload,secret,verifiedHash){
    const newHash=createHash(payload,secret);
    return verifiedHash===newHash
}

export {
    verifySignature
}
