
const defaultState = {
  connectDialogOpen: false,
  changePasswordDialogOpen: false,
  changePassword: {
    oldPassword: ``,
    newPassword: ``,
    confirmNewPassword: ``,
  },
  connect: {
    password: ``,
    ssidValue: ``,
  },
  access_points: [
    {
      ssid: `X`,
      freq: `2412 MHz`,
      rate: `54 MB/s`,
      signal: `100`,
      security: `WPA2`,
      active: `no`,
    },
  ],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case `TOGGLE_CONNECT_DIALOG`:
      if (state.connectDialogOpen) {
        return {
          ...state,
          connect: {
            password: ``,
            ssidValue: ``,
          },
          connectDialogOpen: false,
        };
      }

      return {
        ...state,
        connect: {
          ssidValue: state.access_points[action.index].ssid,
        },
        connectDialogOpen: true,
      };

    case `TOGGLE_CHANGEPASS_DIALOG`:
      if (state.changePasswordDialogOpen) {
        return {
          ...state,
          changePassword: {
            oldPassword: ``,
            newPassword: ``,
            confirmNewPassword: ``,
          },
          changePasswordDialogOpen: false,
        };
      }

      return {
        ...state,
        changePasswordDialogOpen: true,
      };
    default:
      return state;
  }
}
