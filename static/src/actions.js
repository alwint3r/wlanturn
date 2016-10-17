export default {
  toggleConnectDialog: index => ({
    type: `TOGGLE_CONNECT_DIALOG`,
    index,
  }),

  toggleChangePassDialog: () => ({
    type: `TOGGLE_CHANGEPASS_DIALOG`,
  }),

  connectPasswordChange: value => ({
    type: `CONNECT_PASSWORD_VALUE_CHANGED`,
    value,
  }),

  checkForceConnect: value => ({
    type: `CONNECT_FORCE_CHECKED`,
    value,
  }),

  changePassFieldChange: (fieldName, value) => ({
    type: `CHANGEPASS_VALUE_CHANGED`,
    fieldName,
    value,
  }),

  rescan: () => ({
    types: [
      `RESCAN_REQUEST`,
      `RESCAN_SUCCESS`,
      `RESCAN_ERROR`,
    ],

    promiseProducer: () => fetch(`api/access_points`).then(res => res.json()),
  }),

  getActiveConnections: () => ({
    types: [
      `ACTIVECONNECTION_REQUEST`,
      `ACTIVECONNECTION_SUCCESS`,
      `ACTIVECONNECTION_ERROR`,
    ],

    promiseProducer: () => fetch(`api/wifi_active_connections`).then(res => res.json()),
  }),

  connectWifi: () => ({
    types: [
      `CONNECTWIFI_REQUEST`,
      `CONNECTWIFI_SUCCESS`,
      `CONNECTWIFI_ERROR`,
    ],

    promiseProducer: (store) => {
      const state = store.getState();
      const body = JSON.stringify({
        ssid: state.connect.ssidValue,
        password: state.connect.password,
        force: state.connect.force,
      });

      return fetch(`api/connect`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body,
      })
      .then(res => res.json());
    },
  }),

  disconnect: iface => ({
    types: [
      `DISCONNECT_REQUEST`,
      `DISCONNECT_SUCCESS`,
      `DISCONNECT_ERROR`,
    ],

    promiseProducer: () => {
      const body = JSON.stringify({
        iface,
      });

      return fetch(`/api/disconnect`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body,
      }).then(res => res.json());
    },
  }),

  logout: () => ({
    types: [
      `LOGOUT_REQUEST`,
      `LOGOUT_SUCCESS`,
      `LOGOUT_ERROR`,
    ],

    promiseProducer: () =>
      fetch(`/api/logout`, { method: `POST` }).then(res => res.json()),
  }),
};
