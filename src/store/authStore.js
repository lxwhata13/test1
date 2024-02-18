import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { login as apiLogin, refreshAccessToken } from 'src/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    refreshToken: null,
    accessToken: null,
  }),
  // optional getters
  getters: {},
  // optional actions
  actions: {
    async init() {
      this.refreshToken = LocalStorage.getItem('refreshToken');
      this.accessToken = LocalStorage.getItem('accessToken');
    },

    async refreshAccessToken() {
      try {
        if (!!this.refreshToken) {
          let { success, accessToken, message } = await refreshAccessToken(
            this.refreshToken,
          );

          if (success) {
            this.accessToken = accessToken;
            LocalStorage.set('accessToken', accessToken);

            return accessToken;
          } else {
            throw message;
          }
        }
      } catch (e) {
        console.error(e);
        // clear refresh token & access token
        this.logout();
        return null;
      }
    },

    async login(countryCode, accountName, password) {
      try {
        let { success, message, accessToken, refreshToken } = await apiLogin(
          countryCode,
          accountName,
          password,
        );

        if (success) {
          this.refreshToken = refreshToken;
          this.accessToken = accessToken;

          LocalStorage.set('refreshToken', refreshToken);
          LocalStorage.set('accessToken', accessToken);
        }

        return { success, message };
      } catch (e) {
        console.error(e);
        return { success: false, message: 'error.exception' };
      }
    },

    logout() {
      LocalStorage.remove('refreshToken');
      LocalStorage.remove('accessToken');

      this.refreshToken = null;
      this.accessToken = null;
    },
  },
});
