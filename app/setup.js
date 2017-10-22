fs = require('fs');
NodeRSA = require('node-rsa');

let baseKey = new NodeRSA({b: 512});

function generateKeypair() {
    if (!fs.existsSync('src/keypair.json')) {
        let keys = {
            publicKey: baseKey.exportKey("pkcs1-public-pem"),
            privateKey: baseKey.exportKey("pkcs1-private-pem")
        };
        fs.writeFileSync("src/keypair.json", JSON.stringify(keys));
    }
}

// Create keypair
generateKeypair();