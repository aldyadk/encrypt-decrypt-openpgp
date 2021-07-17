# Clone this repository
## make sure you have nodejs & npm installed on your machine 

## Install openpgpjs dependency
`npm install`

## Add your private.asc & public.asc files
#### make sure to edit the const passphrase on line 7 of encrypt-decrypt.js file with your own passphrase string if you suplied your own files

## or

## Generate private.asc & public.asc
#### this will use the default passphrase 
`npm run generate`

## Run example encryption & decryption
`npm run encrypt-decrypt`