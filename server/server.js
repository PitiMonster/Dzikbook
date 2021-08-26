'use strict';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// GLOBAL UNCAUGHT ERROR HANLDERS

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED ERROR');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error(err);
    console.log('DB CONNECTION ERROR');
  });

// Constants
const port = process.env.PORT || 8080;

// // App
// const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
