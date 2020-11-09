# gitlev-front

## Server
https://github.com/aki85/gtp-server

## Environment
* nodejs: ^12.x
* yarn: ^1.9

## Installation
```
yarn
```

## dev

### .env
```
copy .env.example
```
setup .env

### graphql
copy src/graphql/schema.graphql from your graphql server
```
yarn graphql-codegen
```
### dev server
```
yarn start
```