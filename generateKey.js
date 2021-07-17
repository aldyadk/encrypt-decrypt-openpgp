const openpgp = require('openpgp');
const fs = require('fs/promises');

(async () => {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
      type: 'ecc', // Type of the key, defaults to ECC
      curve: 'curve25519', // ECC curve name, defaults to curve25519
      userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
      passphrase: 'super long and hard to guess secret' // protects the private key
  });

  await fs.writeFile('./private.asc', privateKeyArmored);
  await fs.writeFile('./public.asc', publicKeyArmored);
})();