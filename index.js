'use strict';

const express = require(`express`);
const bodyParser = require(`body-parser`);
const config = require(`./config`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(config.http.port, () => {

});

module.exports = app;
