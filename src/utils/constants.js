export const MOBILE_COUNTRY_CODE = '52';
export const COUNTRY_CODES = ['1', '54', '52','55', '56', '90', '92'];
// export const RE_MOBILE_NUMBER = /^\+?(20)?0?1?\d{9}$/;
export const RE_MOBILE_NUMBER = /^\d{8,11}$/;
export const RE_MOBILE_NUMBER_MASK = /^(\d{3})\d+(\d{3})$/;
export const MOBILE_INPUT_MASK = '###########';
export const RE_EMAIL =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const CURRENCY_SYMBOL = 'MX$';
export const CURRENCY_NAME = 'MXN';
export const TIMEZONE = 'America/Sao_Paulo';

export const LINK_DOWNLOAD_APK = 'https://cdn.lottotru.com/download/index.html';

export const DEFAULT_PAGE_SIZE = 20;
