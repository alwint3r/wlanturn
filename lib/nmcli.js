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

    const command = `iwlist scann > /dev/null && nmcli -t -f ${fields} d wifi list`;

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

  activeConnectionOnIface(iface) {
    const connFields = [`NAME`, `DEVICES`];
    const connCmd = `nmcli -t -f ${connFields} c status | grep ${iface}`;

    const connPipeline = _.flow([
      exec,
      splitByNewline,
      omitLastElement,
      result => (result[result.length - 1]
        ? result[result.length - 1].split(`:`)[0]
        : null),
    ]);

    const result = connPipeline(connCmd);

    if (!result) {
      return {};
    }

    const statusFields = [`GENERAL`, `IP`];
    const statusCmd = `nmcli -t -f ${statusFields} c status id "${result}"`;

    function splitByColon(preResult) {
      return preResult.map(res => res.split(`:`));
    }

    function objFromArray(srcArray) {
      return _.zipObject.apply(null, _.zip(srcArray));
    }

    function mapReduceToObject(splitResult) {
      return splitResult
        .map(oneResult => objFromArray(oneResult))
        .reduce((previousValue, nextValue) =>
          _.merge(previousValue, nextValue)
        );
    }

    const statusPipeline = _.flow([
      exec,
      splitByNewline,
      omitLastElement,
      splitByColon,
      mapReduceToObject,
    ]);

    return statusPipeline(statusCmd);
  },

  connect(ssid, password, force) {
    if (!force) {
      const checkCommand = `nmcli c list id "${ssid}"`;

      if (exec(checkCommand).code === 0) {
        return true;
      }
    }

    if (force) {
      exec(`nmcli c delete id "${ssid}"`);
    }

    const command = `nmcli d wifi connect "${ssid}" password "${password}"`;
    const result = exec(command);

    if (result.code !== 0) {
      return false;
    }

    return true;
  },

  disconnect(iface) {
    const command = `nmcli d disconnect iface "${iface}"`;
    const result = exec(command);

    if (result.code !== 0) {
      return false;
    }

    return true;
  },
};
