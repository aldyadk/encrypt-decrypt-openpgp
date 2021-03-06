const openpgp = require('openpgp');
const fs = require('fs/promises');

(async () => {
  try {
    const publicKeyArmored = await fs.readFile('./public.asc', { encoding: 'utf-8' });
    const privateKeyArmored = await fs.readFile('./private.asc', { encoding: 'utf-8' });
    const passphrase = 'super long and hard to guess secret';

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    const privKey = await openpgp.readKeys({ armoredKeys: privateKeyArmored })
    const privateKey = await openpgp.decryptKey({
      privateKey: privKey[0],
      passphrase,
    });

    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: await fs.readFile('./test.txt', { encoding: 'utf8' }) }),
      encryptionKeys: publicKey
    });
    console.log(encrypted);

    const message = await openpgp.readMessage({
      armoredMessage: encrypted
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey
    });
    console.log(decrypted);
  } catch (error) {
    console.log(error)
  }
})();