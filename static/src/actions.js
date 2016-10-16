export default {
  toggleConnectDialog: index => ({
    type: `TOGGLE_CONNECT_DIALOG`,
    index,
  }),

  toggleChangePassDialog: () => ({
    type: `TOGGLE_CHANGEPASS_DIALOG`,
  }),
};
