let express = require('express');
let compression = require('compression');
let Buffer = require('buffer').Buffer;
let toBuffer = require('typedarray-to-buffer');

process.env["GOOGLE_APPLICATION_CREDENTIALS"] = __dirname.concat("/test.json");
const { Query } = require('datastore2')({
  projectId: 'pac-1234'
});

let Protosphere = require('../index.js');

const app = express();
app.use(compression({ level: 9 }));
app.use((req, res, next) => {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});
app.get('/', (req, res) => {
  res.sendFile(__dirname.concat('/index.html'));
});
app.use('/helpers', express.static('./playground/helpers'));
app.use('/dist', express.static('./dist'));
app.get('/endpoint/json', (req, res) => {
  Promise.resolve()
    .then(() => new Query('Reports').runQuery())
    .then((result) => {
      res.set('Content-Type', 'application/json');
      res.send(result);
    });
});
app.get('/endpoint/raw', (req, res) => {
  Promise.resolve()
    .then(() => new Query('Reports').runQuery())
    .then((result) => {
      res.send(result);
    });
});
app.get('/endpoint/arraybuffer', (req, res) => {
  Promise.resolve()
    .then(() => new Query('Reports').runQuery())
    .then((result) => Protosphere.obj2buff(result))
    .then((result) => {
      res.set('Content-Type', 'application/octet-stream');
      res.send(Buffer(result));
    });
});
app.listen(80, () => console.log('Example app listening on port 80!'))
