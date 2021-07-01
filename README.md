# projectcredo-frontend

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

### Localhost HTTPS development

Generated certificate is already added to the project. In case it's expired, a new one can be generated.

### Create localhost certificate

```bash
openssl req -new -newkey rsa:2048 -sha256 -days 3650 -nodes -x509 -keyout localhost.key -out localhost.crt -config <(cat <<-EOF
  [req]
  distinguished_name = req_distinguished_name
  x509_extensions = v3_req
  prompt = no
  [req_distinguished_name]
  CN = localhost
  [v3_req]
  keyUsage = nonRepudiation, digitalSignature, keyEncipherment
  extendedKeyUsage = serverAuth
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = locahost
  DNS.2 = *.localhost
EOF
)
```

### Trust the certificate

On macOS, we can trust the certificate in the System Keychain with this one-liner.

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localhost.crt
```
