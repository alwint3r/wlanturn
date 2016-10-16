
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

    case `CONNECT_PASSWORD_VALUE_CHANGED`:
      return {
        ...state,
        connect: {
          ...state.connect,
          password: action.value,
        },
      };

    case `CHANGEPASS_VALUE_CHANGED`:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          [action.fieldName]: action.value,
        },
      };

    case `RESCAN_REQUSET`:
      return {
        ...state,
      };

    case `RESCAN_SUCCESS`:
      return {
        ...state,
        access_points: action.result,
      };
    case `RESCAN_ERROR`:
      return {
        ...state,
        access_points: [],
      };
    default:
      return state;
  }
}
