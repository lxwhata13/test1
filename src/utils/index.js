import { Dialog, Notify, openURL } from 'quasar';
import copy from 'copy-to-clipboard';
import NoticeDialog from 'src/components/NoticeDialog.vue';
import DailySignupDialog from 'src/components/DailySignupDialog.vue';
import DownloadIosDialog from 'src/components/DownloadDialog.vue';
import BackActivityNotifyDialog from 'src/components/BackActivityNotifyDialog.vue';
import { useI18n } from 'src/boot/i18n';
import { sendIdentifyCode as apiSendIdentifyCode } from 'src/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import router from 'src/router';
import { RE_MOBILE_NUMBER_MASK, TIMEZONE } from './constants';

dayjs.extend(utc);
dayjs.extend(timezone);

const { t } = useI18n();

export function copyText(val) {
  let res = copy(val, { format: 'text/plain' });

  if (res) {
    Notify.create({
      message: t('message.copied'),
      timeout: 1500,
      icon: 'mdi-clipboard-text-outline',
      color: 'positive',
      position: 'top',
    });
  }
}

export const sendIdentifyCode = async (
  countryCode,
  mobile,
  email,
  sendingRef,
  cooldownRef,
) => {
  try {
    sendingRef.value = true;

    let res = await apiSendIdentifyCode(countryCode, mobile, email);

    if (res.cooldown && res.cooldown > 0) {
      cooldownRef.value = res.cooldown;
      let cooldownRefTimer = setInterval(() => {
        cooldownRef.value--;
        if (cooldownRef.value <= 0) {
          clearInterval(cooldownRefTimer);
        }
      }, 1000);
    }

    if (res.success) {
      Notify.create({
        message: t('account.message.smsSent'),
        icon: 'mdi-check-circle',
        position: 'top',
        type: 'positive',
      });
    } else {
      Notify.create({
        message: t(res.message || 'error.server.unknown'),
        icon: 'mdi-information-outline',
        position: 'top',
        type: 'negative',
      });
    }
  } catch (e) {
    console.error(e);

    Notify.create({
      message: t('account.message.smsFailed'),
      icon: 'mdi-information-outline',
      position: 'top',
      type: 'negative',
    });
  } finally {
    sendingRef.value = false;
  }
};

export const showMessageDialog = ({ title, content }) => {
  Dialog.create({
    component: NoticeDialog,
    componentProps: {
      title,
      content,
    },
  });
};

export const showDailySignupDialog = () => {
  Dialog.create({
    component: DailySignupDialog,
  });
};

export const showBackActivityNotifyDialog = () => {
  Dialog.create({
    component: BackActivityNotifyDialog,
  });
};

export const gotoRecharge = (configStore) => {
  router.push({ name: 'Recharge' });
};

export const gotoCarouselLink = (item) => {
  switch (item.linkType?.toUpperCase()) {
    case 'INTERNAL':
      item.link
        ? router.push(item.link)
        : console.error('carousel item link not set');
      break;

    case 'EXTERNAL':
      item.link
        ? window.open(item.link)
        : console.log('carousel external link not set');
      break;

    case 'ARTICLE':
      item.content
        ? router.push(`/article/carousel/${item.id}`)
        : console.error('carousel item link not set');
      break;

    default:
      break;
  }
};

export const convertServerDateTime = (val) => {
  if (!!val) {
    const a = val.split(/[^0-9]/);
    const m = parseInt(a[1]) - 1;
    return Date.UTC(+a[0], m, +a[2], +a[3], +a[4], +a[5]);
  }

  return null;
};

const dateFormatter = new Intl.DateTimeFormat('zh-Hans-CN', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  // @ts-ignore
  hourCycle: 'h23',
});

export function formatServerDateTime(val) {
  if (!!val) {
    const utcDate = convertServerDateTime(val);
    return dateFormatter.format(utcDate).replaceAll('/', '-');
  } else {
    return '';
  }
}

export const convertTransactionId = (transactionId) => {
  if (typeof transactionId === 'string') {
    return transactionId.replace(/^(\w{8})\w+(\w{16}$)/, '$1...$2');
  } else {
    return null;
  }
};

export const maskEmail = (email) => {
  if (typeof email === 'string') {
    return email.replace(/^([^@]+)@([^\.]+)\.(.*)/, '$1@***.$3');
  } else {
    return null;
  }
};

export function maskMobile(val) {
  if (val) {
    return val.replace(RE_MOBILE_NUMBER_MASK, '$1****$2');
  }

  return '';
}

export function postForm(path, params) {
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = 'post';
  form.action = path;

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

export function formatTimestamp(val, format = 'YYYY-MM-DD HH:mm:ss') {
  if (val) {
    return dayjs(val).format(format);
  }
}

export function getOS() {
  var userAgent = window.navigator.userAgent,
    os = null;

  if (/wv\)/.test(userAgent)) {
    os = 'app';
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
    os = 'ios';
  } else if (/(Android)/i.test(navigator.userAgent)) {
    os = 'android';
  } else {
    os = 'pc';
  }

  return os;
}

export function downloadApp(configStore) {
  switch (getOS()) {
    case 'android':
    case 'pc':
      openURL(configStore.sysConfig.downloadUrl);
      break;

    case 'ios':
      Dialog.create({
        component: DownloadIosDialog,
      });
      break;

    default:
      break;
  }
}

export function pad(d) {
  return d < 10 ? '0' + d.toString() : d.toString();
}

export function isInTimeRange(beginTime, endTime) {

  const utcStartTime = new Date(beginTime);
  const utcEndTime = new Date(endTime);

  const currentUtcTime = new Date();
  return (currentUtcTime >= utcStartTime && currentUtcTime <= utcEndTime);
}
