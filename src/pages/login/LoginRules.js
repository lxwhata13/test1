import { useI18n } from 'src/boot/i18n';
import { isMobileExists, isEmailExists, isNameExist } from 'src/api';
import { RE_EMAIL, RE_MOBILE_NUMBER } from 'src/utils/constants';
import { useConfigStore } from 'src/store/configStore';

const { sysConfig, countryCode } = useConfigStore();

const { t } = useI18n();

export const mobileRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', { fieldName: t('account.label.mobile') }),
  (val) => RE_MOBILE_NUMBER.test(val) || t('account.message.invalidMobile'),
];

export const loginMobileRules = [
  (val) =>
    (val !== null && val !== '' && val !== undefined) ||
    t('message.required', { fieldName: t('account.placeholder.loginMobile') }),
  async (val) => {
    let res;

    return true;
  },
];

export const loginEmailRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', { fieldName: t('account.placeholder.loginEmail') }),
  async (val) => {
    let res;
    return true;
  },
];

export const registerMobileRules = [
  ...mobileRules,
  async (val) => {
    let res = await isMobileExists(countryCode, val);
    return (
      (res.success && res.exists === false) || t('account.message.mobileInUse')
    );
  },
];

export const registerNameRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', { fieldName: t('account.label.accountName') }),
  (val) => val.length >= 4 || t('message.minLength', { length: 4 }),
  async (val) => {
    let res = await isNameExist(val);
    return (
      (res.success && res.exists === false) || t('account.message.nameInUse')
    );
  },
];

export const emailRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', { fieldName: t('account.label.email') }),
  (val) => RE_EMAIL.test(val) || t('account.message.invalidEmail'),
];

export const registerEmailRules = [
  ...emailRules,
  async (val) => {
    let res = await isEmailExists(val);
    return (
      (res.success && res.exists === false) || t('account.message.emailInUse')
    );
  },
];

export const passwordRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', { fieldName: t('account.label.password') }),
  (val) => val.length >= 6 || t('message.minLength', { length: 6 }),
];

export const identifyCodeRules = [
  (val) =>
    (val !== null && val !== '') ||
    t('message.required', {
      fieldName: t('account.label.verificationCode'),
    }),
  (val) =>
    /^\d{6}$/.test(val) ||
    t('message.invalidValue', {
      fieldName: t('account.label.verificationCode'),
    }),
];

export const inviteCodeRules = [
  (val) =>
    (val !== null && val !== '') ||
    !sysConfig.registerRequireInviteCode ||
    t('message.required', {
      fieldName: t('account.label.inviteCode'),
    }),
  (val) =>
    !sysConfig.registerRequireInviteCode ||
    /^[A-Z0-9]{6}$/.test(val) ||
    t('message.invalidValue', {
      fieldName: t('account.label.inviteCode'),
    }),
];
