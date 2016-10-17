'use strict';

const sqlite3 = require(`sqlite3`);
const file = `${__dirname}/../database.sqlite3`;
const bcrypt = require(`bcrypt`);

let instance;

module.exports = {
  getInstance() {
    if (!instance) {
      instance = new sqlite3.Database(file);
      instance.serialize(() => {
        instance.run(`CREATE TABLE IF NOT EXISTS account(username TEXT, password TEXT)`);

        instance.get(`SELECT * FROM account WHERE username = "admin"`, (err, result) => {
          if (err) {
            return process.exit(1);
          }

          if (!result) {
            const username = `admin`;
            const defaultPassword = `flyingbutton`;
            const hashed = bcrypt.hashSync(defaultPassword, 8);

            instance.run(`INSERT INTO account(username, password) VALUES("${username}", "${hashed}")`);
          }

          return null;
        });
      });

      return instance;
    }

    return instance;
  },
};

