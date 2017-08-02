const express = require('express');
const path = require('path');

const app = express();

app.listen(8080, () => {
  console.log("app listening on port 8080")
});

app.use(express.static('public'));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if ('OPTIONS' == req.method) {
    return res.send(200);
  }
  next();
});

app.get('/', function (req, res) {
  res.end("ok");
});