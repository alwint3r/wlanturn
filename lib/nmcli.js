'use strict';

const shell = require(`shelljs`);
const _ = require(`lodash`);

const commands = require(`./nmcli_commands`);

function exec(command) {
  return shell.exec(command, { silent: true });
}

function execAsync(command, done) {
  return shell.exec(command, { silent: true, async: true }, done);
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
  listAp(callback) {
    const fields = [
      `SSID`,
      `FREQ`,
      `RATE`,
      `SIGNAL`,
      `SECURITY`,
      `ACTIVE`,
    ];

    function generateObject(list) {
      return list
        .map(ap => _.zipObject(
          fields.map(field => field.toLowerCase()), ap.split(`:`)))
        .map(ap => _.merge(ap, { ssid: removeQuotes(ap.ssid) }));
    }

    const command = commands.listAp(fields);
    execAsync(command, (code, stdout, stderr) => {
      if (code !== 0) {
        return callback(new Error(stderr));
      }

      const pipeline = _.flow([
        splitByNewline,
        omitLastElement,
        generateObject,
      ]);

      const result = pipeline({ stdout });

      return callback(null, result);
    });
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

  activeConnectionOnIface(iface, callback) {
    const connCmd = commands.activeConnection(iface);

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

    execAsync(connCmd, (code, stdout, stderr) => {
      if (code !== 0) {
        return callback(new Error(stderr));
      }

      const connPipeline = _.flow([
        splitByNewline,
        omitLastElement,
        result => (result[result.length - 1]
          ? result[result.length - 1].split(`:`)[0]
          : null
        ),
      ]);

      const result = connPipeline({ stdout });

      if (!result) {
        return callback(null, {});
      }

      const statusCmd = commands.connectionStatus(result);

      return execAsync(statusCmd, (statusCode, statusOut, statusErr) => {
        if (statusCode !== 0) {
          return callback(new Error(statusErr));
        }

        const statusPipeline = _.flow([
          splitByNewline,
          omitLastElement,
          splitByColon,
          mapReduceToObject,
        ]);

        const statusResult = statusPipeline({ stdout: statusOut });

        return callback(null, statusResult);
      });
    });
  },

  connect(ssid, password, force, done) {
    const newConnectionCmd = commands.newConnection(ssid, password);
    const upCmd = commands.upExistingConnection(ssid);
    const infoCmd = commands.showConnectionInfo(ssid);

    if (!force) {
      return execAsync(infoCmd, (code, stdout, stderr) => {
        if (code === 0) {
          return execAsync(upCmd, (upCode, upOut, upErr) => {
            if (upCode !== 0) {
              return done(new Error(upErr));
            }

            return done(null);
          });
        }

        return done(new Error(stderr));
      });
    }

    return execAsync(newConnectionCmd, (code, stdout, stderr) => {
      if (code !== 0) {
        return done(new Error(stderr));
      }

      return done(null);
    });
  },

  disconnect(iface, done) {
    const command = commands.disconnect(iface);

    execAsync(command, (code, stdout, stderr) => {
      if (code !== 0) {
        return done(new Error(stderr));
      }

      return done(null, true);
    });
  },
};
