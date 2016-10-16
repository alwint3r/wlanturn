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
};
