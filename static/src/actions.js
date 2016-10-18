/* eslint quote-props:0 */

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

    promiseProducer: (store) => {
      const token = store.getState().jwt;

      return fetch(`api/access_points`, {
        method: `GET`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': `application/json`,
        },
      }).then(res => res.json())
        .then((response) => {
          if (response.error) {
            return Promise.reject({ message: response.message });
          }

          return Promise.resolve(response);
        });
    },
  }),

  getActiveConnections: () => ({
    types: [
      `ACTIVECONNECTION_REQUEST`,
      `ACTIVECONNECTION_SUCCESS`,
      `ACTIVECONNECTION_ERROR`,
    ],

    promiseProducer: store =>
      fetch(`api/wifi_active_connections`, {
        headers: {
          'Authorization': `Bearer ${store.getState().jwt}`,
          'Accept': `application/json`,
        },
      })
      .then(res => res.json()),
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
          'Authorization': `Bearer ${store.getState().jwt}`,
          'Accept': `application/json`,
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

    promiseProducer: (store) => {
      const body = JSON.stringify({
        iface,
      });

      return fetch(`/api/disconnect`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Bearer ${store.getState().jwt}`,
          'Accept': `application/json`,
        },
        body,
      }).then(res => res.json());
    },
  }),

  logout: () => ({
    type: `LOGOUT`,
  }),

  loginFormFieldChange: (fieldName, value) => ({
    type: `LOGINFORM_FIELD_CHANGE`,
    fieldName,
    value,
  }),

  loginFormSubmit: () => ({
    types: [
      `LOGIN_REQUEST`,
      `LOGIN_SUCCESS`,
      `LOGIN_ERROR`,
    ],

    promiseProducer: (store) => {
      const { username, password } = store.getState().login;
      const body = JSON.stringify({ username, password });

      if (!username || !password) {
        return Promise.reject({
          message: `Username & password must not be empty!`,
        });
      }

      return fetch(`/api/login`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          'Accept': `application/json`,
        },
        body,
      })
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          return Promise.reject({
            message: response.message,
          });
        }

        return response;
      });
    },
  }),

  closeSnackbar: () => ({
    type: `CLOSE_SNACKBAR`,
  }),

  changePassword: () => ({
    types: [
      `CHANGEPASS_REQUEST`,
      `CHANGEPASS_SUCCESS`,
      `CHANGEPASS_ERROR`,
    ],

    promiseProducer: (store) => {
      const { oldPassword, newPassword, confirmNewPassword } = store.getState().changePassword;
      const body = JSON.stringify({ oldPassword, newPassword, confirmNewPassword });

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return Promise.reject({
          message: `All field must not be empty!`,
        });
      }

      if (newPassword !== confirmNewPassword) {
        return Promise.reject({
          message: `New password & confirm password do not match`,
        });
      }

      return fetch(`/api/change_pass`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          'Accept': `application/json`,
          'Authorization': `Bearer ${store.getState().jwt}`,
        },
        body,
      })
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          return Promise.reject({
            message: response.message,
          });
        }

        return response;
      });
    },
  }),
};
