# Dzikbook

Dzikbook is a social media web application. It is designed especially for people who work out at the gym.

## Installation

Before you run Dzikbook you should add file with environmental variables.

### Server side

In _server_ directory create file **config.env**.
You should place there these variables:

- NODE_ENV = [production/development] - in what environment node will run
- PORT=8080 - to use other port you should also make changes in _docker-compose.yml_ and _Dockerfile_ files
- DATABASE - link to connect your Mongo DB
- TEST_DATABASE - link to connect your test Mongo DB
- DATABASE_PASSWORD - password to your database

- JWT_SECRET - secret key to encode jwt tokens
- JWT_EXPIRES_IN=90d - time to jwt expire
- JWT_COOKIE_EXPIRES_IN=90 - time to cookie expire

### Frontend side

In _web-app_ directory create file **.en.development**.
Your should place there these variables:

- REACT_APP_SERVER_ADDR = 'http://127.0.0.1:8080/api/v1' - address of your server

## Running

### Server side

Server app, written in Node.js is placed in _server_ directory.

You can run it in two ways:

1. With [docker](https://www.docker.com/get-started) tool

```
docker-compose up
```

2. With [npm](https://docs.npmjs.com/getting-started) package manager

```
# install all needed packages
npm i

# run project
npm start
```

### Frontend side

Frontent app, written in React.js is place in _web-app_ directory.

You can run it with following commands.

```
# install needed packages
npm i

# run app
npm run
```

## Documentation

[Postman](https://documenter.getpostman.com/view/11153882/U16jNmC1)

## License

[MIT](https://choosealicense.com/licenses/mit/)
