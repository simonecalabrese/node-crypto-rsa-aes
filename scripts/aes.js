// Import native Node crypto module
// See the official docs https://nodejs.org/api/crypto.html
const crypto = require("crypto");

//Symmetric encryption/decryption using a secretKey of **!32 BYTES FIXED LENGTH!**

const text = "Some random text";
const algorithm = "aes-256-ctr";

//MUST BE 32 CHARS
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
//generate a random initialization vector to make the cipher more complex
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};
console.log("(AES) Text: " + text);
let encrTxt = encrypt(text);
console.log("(AES) encryptedText:");
console.log(encrTxt);
console.log("(AES) decrpytedText:" + decrypt(encrTxt));
