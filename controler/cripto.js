const crypto=require('crypto')
const algorithm='aes-256-cbc';
const key =crypto.randomBytes(32);
const iv =crypto.randomBytes(16);

var encription={}
encription.encript=function(text){
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    // console.log("p")
   }

encription.decrypt = function(text){
    
    console.log(m)
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
   }
exports.data=encription
// var x=encript("pramish")