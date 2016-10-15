'use strict';

const Router = require(`express`).Router;
const router = new Router();

const nmcli = require(`../lib/nmcli`);

router.get(`/access_points`, (req, res) =>
  res.json(nmcli.listAp())
);

module.exports = router;
