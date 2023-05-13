// Import native Node crypto module
// See the official docs https://nodejs.org/api/crypto.html
const crypto = require("crypto");

// Generate random public and private keys
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

console.log("\nGenerating new RSA Keypair \n");
console.log("The public key is: \n", publicKey);
console.log("\n\nThe private key is: \n", privateKey);

// encryption/decryption examples (all the encrypted data should be saved in base64)
let plainText = "Hello world!";
const encryptedText = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // convert the data string to a buffer using `Buffer.from`
  Buffer.from(plainText)
);
console.log("(RSA) The plain text is: " + plainText);
console.log("(RSA) The encrypted text is: " + encryptedText.toString("base64"));

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
console.log("(RSA) The decrypted text is: " + decryptedText);
