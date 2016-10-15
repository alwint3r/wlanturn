'use strict';

const shell = require(`shelljs`);
const _ = require(`lodash`);

function exec(command) {
  return shell.exec(command, { silent: true });
}

function splitByNewline(output) {
  return output.stdout.split(`\n`);
}

function omitLastElement(list) {
  return list.slice(0, list.length - 1);
}

function removeQuotes(string) {
  return string.replace(/'/g, ``);
}

module.exports = {
  listAp() {
    const fields = [
      `SSID`,
      `FREQ`,
      `RATE`,
      `SIGNAL`,
      `SECURITY`,
      `ACTIVE`,
    ];

    const command = `nmcli -t -f ${fields} d wifi list`;

    function generateObject(list) {
      return list
        .map(ap => _.zipObject(
          fields.map(field => field.toLowerCase()), ap.split(`:`)))
        .map(ap => _.merge(ap, { ssid: removeQuotes(ap.ssid) }));
    }

    const pipeline = _.flow([
      exec,
      splitByNewline,
      omitLastElement,
      generateObject,
    ]);

    return pipeline(command);
  },

  listWirelessDevice() {
    const fields = [`DEVICE`, `TYPE`, `STATE`];
    const command = `nmcli -t -f ${fields} d | grep wireless`;

    function generateObject(list) {
      return list.map(dev => _.zipObject(
        fields.map(field => field.toLowerCase()),
        dev.split(`:`)
      ));
    }

    const pipeline = _.flow([
      exec,
      splitByNewline,
      omitLastElement,
      generateObject,
    ]);

    return pipeline(command);
  },
};
