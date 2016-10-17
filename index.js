'use strict';

const express = require(`express`);
const bodyParser = require(`body-parser`);
const passport = require(`passport`);
const config = require(`./config`);

require(`./lib/sqlite3`).getInstance();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require(`cookie-parser`)());
app.use(require(`express-session`)(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.use(`/api`, require(`./middlewares/api`));

app.listen(config.http.port, () => {

});

module.exports = app;
