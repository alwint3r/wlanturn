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
    force: false,
  },
  shouldRescan: false,
  access_points: [],
  active_connections: [],
  loggedIn: false,
  jwt: ``,
  login: {
    username: ``,
    password: ``,
  },
  snackbar: {
    open: false,
    message: ``,
  },
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

      if (state.access_points[action.index]
        && state.access_points[action.index].active === `yes`) {
        return state;
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

    case `CONNECT_FORCE_CHECKED`:
      return {
        ...state,
        connect: {
          ...state.connect,
          force: action.value,
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
        shouldRescan: true,
      };

    case `RESCAN_SUCCESS`:
      return {
        ...state,
        access_points: action.result.result || [],
        shouldRescan: false,
      };
    case `RESCAN_ERROR`:
      return {
        ...state,
        access_points: [],
        shouldRescan: false,
      };

    case `ACTIVECONNECTION_REQUEST`:
      return {
        ...state,
        shouldRescan: true,
      };

    case `ACTIVECONNECTION_SUCCESS`:
      return {
        ...state,
        active_connections: action.result.active_connections.map(con => ({
          ip: con[`IP4.ADDRESS[1]`],
          name: con[`GENERAL.NAME`],
          interface: con[`GENERAL.DEVICES`],
        })),
        shouldRescan: false,
      };
    case `ACTIVECONNECTION_ERROR`:
      return {
        ...state,
        active_connections: [],
      };

    case `CONNECTWIFI_REQUEST`:
      return {
        ...state,
      };

    case `CONNECTWIFI_SUCCESS`:
      return {
        ...state,
        connectDialogOpen: false,
        connect: defaultState.connect,
        shouldRescan: true,
        snackbar: {
          open: true,
          message: `Connected!`,
        },
      };

    case `CONNECTWIFI_ERROR`:
      return {
        ...state,
        shouldRescan: false,
        snackbar: {
          open: true,
          message: action.error.message,
        },
      };

    case `DISCONNECT_REQUEST`:
      return {
        ...state,
      };

    case `DISCONNECT_SUCCESS`:
      return {
        ...state,
        shouldRescan: true,
        snackbar: {
          message: `Disconnected!`,
          open: true,
        },
      };

    case `DISCONNECT_ERROR`:
      return {
        ...state,
        shouldRescan: false,
      };

    case `LOGOUT`:
      return {
        ...state,
        loggedIn: false,
        jwt: ``,
      };

    case `LOGIN_REQUEST`:
      return {
        ...state,
      };

    case `LOGIN_SUCCESS`:
      return {
        ...state,
        loggedIn: true,
        jwt: action.result.token,
        login: {
          username: ``,
          password: ``,
        },
      };

    case `LOGIN_ERROR`:
      return {
        ...state,
        loggedIn: false,
        jwt: ``,
        snackbar: {
          open: true,
          message: action.error.message,
        },
        login: {
          username: ``,
          password: ``,
        },
      };

    case `LOGINFORM_FIELD_CHANGE`:
      return {
        ...state,
        login: {
          ...state.login,
          [action.fieldName]: action.value,
        },
      };

    case `CLOSE_SNACKBAR`:
      return {
        ...state,
        snackbar: defaultState.snackbar,
      };

    case `CHANGEPASS_REQUEST`:
      return {
        ...state,
      };

    case `CHANGEPASS_SUCCESS`:
      return {
        ...state,
        changePassword: {
          oldPassword: ``,
          newPassword: ``,
          confirmNewPassword: ``,
        },
        snackbar: {
          open: true,
          message: `Password is changed!`,
        },
      };

    case `CHANGEPASS_ERROR`:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.error.message,
        },
        changePassword: {
          oldPassword: ``,
          newPassword: ``,
          confirmNewPassword: ``,
        },
      };

    default:
      return state;
  }
}
