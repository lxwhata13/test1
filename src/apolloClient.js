// import { toRaw } from 'vue';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { logErrorMessages } from '@vue/apollo-util';
import { useAuthStore } from 'src/store/authStore';
import { useConfigStore } from 'src/store/configStore';
import { useUserStore } from 'src/store/userStore';
import { useI18n } from 'src/boot/i18n';
import router from 'src/router';
import { Notify, Dialog } from 'quasar';
import { gotoRecharge } from 'src/utils';

const { t } = useI18n();

const errorLink = onError((error) => {
  const { networkError, graphQLErrors } = error;

  if (networkError) {
    switch (networkError.statusCode) {
      case 401:
      case 403:
        router.replace({ name: 'Login' });
        break;

      case 503:
      case 504:
        router.replace({ name: 'ErrorNetwork' });
        break;
    }
  }

  if (graphQLErrors?.length > 0) {
    let message = graphQLErrors[0].message;
    let params = graphQLErrors[0].params || {};

    console.log(graphQLErrors[0].params);

    if (message === 'not_enough_balance') {
      const configStore = useConfigStore();

      Dialog.create({
        title: t('common.hint'),
        message: t('error.hint.not_enough_balance'),
        persistent: true,
        ok: t('common.go'),
        cancel: t('common.cancel'),
      }).onOk(() => {
        gotoRecharge(configStore);
      });
    } else if (message === 'pixWalletNotSet') {
      const userStore = useUserStore();
      userStore.setPixWallet({});
      Dialog.create({
        title: t('withdraw.label.bindPixWallet'),
        message: t('withdraw.message.bindPixWallet'),
        persistent: true,
      }).onOk(() => {
        router.push({ name: 'PixWallet' });
      });
    } else if (message === 'userBankcardNotSet') {
      Dialog.create({
        title: t('withdraw.label.bindBankCard'),
        message: t('withdraw.message.bindBankCard'),
        persistent: true,
      }).onOk(() => {
        router.push({ name: 'Bankcard' });
      });
    
    }
    else {
      let i18nMessage = t(`server.${message}`, params);

      if (!i18nMessage.startsWith('server.')) {
        message = i18nMessage;
      } else {
        i18nMessage = t(`error.server.${message}`, params);

        if (!i18nMessage.startsWith('error.server.')) {
          message = i18nMessage;
        }
      }

      Notify.create({
        message,
        icon: 'mdi-information-outline',
        position: 'top',
        type: 'negative',
      });
    }
  }

  logErrorMessages(error);
});

const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const customFetch = async (uri, options) => {
  const initialResponse = await fetch(uri, options);

  if (initialResponse.ok || initialResponse.status !== 403) {
    return initialResponse;
  }

  const authStore = useAuthStore();
  let newAccessToken = await authStore.refreshAccessToken();
  options.headers.authorization = `Bearer ${newAccessToken}`;

  let response = await fetch(uri, options);
  return response;
};

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: '/gql',
  fetch: customFetch,
});

const mergeListResult = (existing, incoming) => {
  if (!existing) return incoming;

  if (!!existing.items.find(({ __ref }) => __ref === incoming.items[0].__ref)) {
    return existing;
  } else if (
    !!incoming.items.find(({ __ref }) => __ref === existing.items[0].__ref)
  ) {
    return incoming;
  } else {
    return {
      ...incoming,
      items: [...existing.items, ...incoming.items],
    };
  }
};

const replaceResult = (existing, incoming) => {
  return incoming;
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listSiteMessages: {
          // keyArgs: ["paginationParams"],
          merge: replaceResult,
        },
        listStreamRecords: {
          merge: replaceResult,
        },
        listBetRecords: {
          merge: replaceResult,
        },
        listRechargeOrders: {
          merge: replaceResult,
        },
        listWithdrawOrders: {
          merge: replaceResult,
        },
        listUserTeam: {
          merge: mergeListResult,
        },
      },
    },
  },
});

// const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache,
});
