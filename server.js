const express = require('express');

const dotenv = require('dotenv').config();

var cors = require('cors');
const connectDb = require('./config/dbConnection');
const { listAllFiles } = require('./jobs/emblem');

const { readColor, listAllFilesCards } = require('./jobs/cards');
const { listAllFilesWorlds } = require('./jobs/worlds');
const { listAllFilesTopic } = require('./jobs/topic');
const { listAllFilesPosts } = require('./jobs/post');
const { listAllFilesBenz } = require('./jobs/beanz');

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
// console.log(listAllFilesCards());
// console.log(listAllFiles());
// listAllFilesWorlds();
// listAllFilesTopic();
// listAllFilesPosts();
// listAllFilesBenz();
app.use('/api/card', require('./routers/card'));
app.use('/api/collectors', require('./routers/collector'));
app.use('/api/emblems', require('./routers/emblems'));
app.use('/api/categories', require('./routers/categories'));
app.use('/api/worlds', require('./routers/worlds'));
app.use('/api/posts', require('./routers/posts'));
app.use('/api/topics', require('./routers/topic'));
app.use('/api/beanz', require('./routers/beanz'));
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`listen in port ${port}`);
});

module.exports = app;
