# Generate RSA Public and Private Keys for JWT Signing
```bash
openssl genrsa -out privatekey.pem 2048
openssl rsa -in privatekey.pem -out publickey.pem -pubout
openssl pkcs8 -in privatekey.pem -topk8 -nocrypt -out privatekey-pkcs8.pem
```

- Use privatekey-pkcs8.pem for JWT generation and signing
- Use publickey.pem for JWT validation

# Upload public and private keys to KVM


# Deploy JWT generation and validation proxies
- demo-jwt-generation
- demo-jwt-validation


