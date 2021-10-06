
//Import native Node crypto module
//See the official docs https://nodejs.org/api/crypto.html
const crypto = require('crypto');
 
//RSA
//Generate random public and private keys
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});
console.log("\n-------RSA-------\n")
console.log("The public key is1: ", publicKey);
console.log();
console.log("The private key is: ", privateKey);

//Text encryption/decryption
//(all the encrypted data should be saved in base64)
let plainText = 'Hello world!'

const encryptedText = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(plainText)
);
console.log("(RSA) The plain text is: "+ plainText)
console.log("(RSA) The encrypted text is: "+encryptedText.toString('base64'))

const decryptedText = crypto.privateDecrypt(
  {
    key: privateKey,
    // In order to decrypt the data, we need to specify the
    // same hashing function and padding scheme that we used to
    // encrypt the data in the previous step
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  encryptedText
);

console.log("(RSA) The decrypted text is: "+decryptedText)

//AES
//Symmetric encryption/decryption using a secretKey of **!32 BYTES FIXED LENGTH!**

const text = "Some random text"
const algorithm = 'aes-256-ctr';

//MUST BE 32 CHARS
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
//generate a random initialization vector to make the cipher more complex
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};
console.log("\n\n\n-------AES-------\n")
console.log("(AES) Text: "+text)
let encrTxt = encrypt(text)
console.log("(AES) encryptedText:")
console.log(encrTxt)
console.log("(AES) decrpytedText:"+ decrypt(encrTxt))




