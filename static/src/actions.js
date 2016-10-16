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
};
