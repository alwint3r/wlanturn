
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
  access_points: [],
  active_connections: [],
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

    case `ACTIVECONNECTION_REQUSET`:
      return {
        ...state,
      };

    case `ACTIVECONNECTION_SUCCESS`:
      return {
        ...state,
        active_connections: action.result.active_connections.map(con => ({
          ip: con[`IP4.ADDRESS[1]`],
          name: con[`GENERAL.NAME`],
          interface: con[`GENERAL.DEVICES`],
        })),
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
      };

    case `CONNECTWIFI_ERROR`:
      return {
        ...state,
      };

    default:
      return state;
  }
}
