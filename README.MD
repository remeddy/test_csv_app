# Install

```
$ npm install
```

# Run (node 7.0.0 version and on)

```
$node  --harmony server.js --directory <path to public> --port <port / default is 3000>
```
for example
```
$node  --harmony server.js --directory C:\import-csv-to-db\public\  --port 8080
```


# Unit Tests

## Install mocha for unit tests

```
$npm install mocha -g

```

## Run unit tests

```
$mocha --watch --reporter=nyan ./*-spec.js
```
