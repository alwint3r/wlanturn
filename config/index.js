'use strict';

module.exports = {
  http: {
    port: 8080,
    hostname: `localhost`,
    proto: `http`,
    get fullHostname() {
      return `${this.proto}://${this.hostname}:${this.port}`;
    },
  },

  jwt: {
    secret: `y'saarj is dead`,
    expiresIn: 60 * 60,
  },
};
