'use strict';

const shell = require(`shelljs`);

const commands = {
  '0.9.8': {
    listAp: fields => `iwlist scann > /dev/null && nmcli -t -f ${fields} d wifi list`,
    activeConnection: iface => `nmcli -t -f NAME,DEVICES c status | grep ${iface}`,
    connectionStatus: id => `nmcli -t -f GENERAL,IP c status id "${id}"`,
    newConnection: (ssid, password) => `nmcli d wifi connect "${ssid}" password "${password}"`,
    showConnectionInfo: ssid => `nmcli c list id "${ssid}"`,
    upExistingConnection: ssid => `nmcli c up id "${ssid}"`,
    disconnect: iface => `nmcli d disconnect iface "${iface}"`,
    listWirelessDevice: () => `nmcli -t -f DEVICE,TYPE,STATE d | grep wireless`,
    version: () => `0.9.8`,
  },
  '0.9.10': {
    listAp: fields => `iwlist scann > /dev/null && nmcli -t -f ${fields} d wifi list`,
    activeConnection: iface => `nmcli -t -f NAME,DEVICE c show --active | grep ${iface}`,
    connectionStatus: id => `nmcli -t -f GENERAL,IP4 c show id "${id}"`,
    newConnection: (ssid, password) => `nmcli d wifi connect "${ssid}" password "${password}"`,
    showConnectionInfo: ssid => `nmcli c show id "${ssid}"`,
    upExistingConnection: ssid => `nmcli c up id "${ssid}"`,
    disconnect: iface => `nmcli d disconnect ifname "${iface}"`,
    listWirelessDevice: () => `nmcli -t -f DEVICE,TYPE,STATE d | grep wifi`,
    version: () => `0.9.10`,
  },
};

function scanVersion() {
  const out = shell.exec(`nmcli --version`, { silent: true });
  if (out.code !== 0) {
    return false;
  }

  const version = out.stdout
    .split(`\n`)
    .shift()
    .split(` `)
    .pop()
    .split(`.`)
    .slice(0, 3)
    .join(`.`);

  return version;
}

module.exports = commands[scanVersion()];
