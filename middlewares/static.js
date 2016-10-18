'use strict';

const express = require(`express`);
const path = require(`path`);
const router = new express.Router();

const indexFile = path.join(__dirname, `../static/build/index.html`);

router.get(`/`, (req, res) => res.sendFile(indexFile));
router.get(`/login`, (req, res) => res.sendFile(indexFile));
router.use(express.static(path.join(__dirname, `../static/build/`)));

module.exports = router;
