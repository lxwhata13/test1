import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

import { Quasar } from 'quasar';

let browserLocale = Quasar.lang.getLocale();

let locale = 'es-MX';

if (browserLocale.startsWith('es')) {
  locale = 'es-MX';
}

const datetimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  'pt-BR': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    'es-MX': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    }
  },
};

const i18n = createI18n({
  locale,
  warnHtmlInMessage: 'off',
  fallbackLocale: 'en-US',
  messages,
  datetimeFormats,
});

export function addServerMessages(i18nMessages) {
  i18n.global.mergeLocaleMessage('en-US', { server: i18nMessages });
}

export default boot(async ({ app }) => {
  // Set i18n instance on app
  app.use(i18n);

  if (locale !== 'en-US') {
    try {
      await import(
        /* webpackInclude: /(pt-BR|en-US)\.js$/ */
        'quasar/lang/' + locale
      ).then((lang) => {
        Quasar.lang.set(lang.default);
      });
    } catch (err) {
      console.error(err);
    }
  }
});

export function useI18n(namespace) {
  function getKey(key) {
    if (!namespace) {
      return key;
    }

    if (key.startsWith(namespace)) {
      return key;
    }

    return `${namespace}.${key}`;
  }

  const { t, ...methods } = i18n.global;

  return {
    ...methods,

    t: (key, ...args) => {
      if (!key) return '';
      return t(getKey(key), ...args);
    },
  };
}
