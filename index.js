'use strict';

const express = require(`express`);
const bodyParser = require(`body-parser`);
const config = require(`./config`);

require(`./lib/sqlite3`).getInstance();

const app = express();

app.disable(`x-powered-by`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api`, require(`./middlewares/api`));
app.use(require(`./middlewares/static`));
app.use((req, res, next) => {
  const error = new Error(`Not found`);
  error.status = 404;

  return next(error);
});
app.use((err, req, res) => {
  if (req.headers[`content-type`].indexOf(`json`).length > -1) {
    res.status(err.status || 500);

    return res.json({ error: true, message: err.message });
  }

  res.status(err.status || 500);

  return res.end(err.message);
});

app.listen(config.http.port, () => {

});

module.exports = app;
