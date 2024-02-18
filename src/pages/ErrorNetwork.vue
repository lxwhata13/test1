<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <img
        alt="Network Error"
        src="~assets/images/net-error.svg"
        style="width: 200px; height: 200px"
      />
      <div class="text-body1">{{ t('error.hint.network') }}</div>
      <q-btn
        class="q-mt-xl"
        color="primary"
        @click="reload"
        :label="t('common.retry')"
        style="line-height: 35px; height: 35px; width: 100px"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'src/boot/i18n';
import { joinChannel } from 'src/boot/channel';

const configStore = useConfigStore();
const userStore = useUserStore();
const router = useRouter();

const $q = useQuasar();
const { t } = useI18n();

async function reload() {
  try {
    if (!configStore.sysConfig) {
      await configStore.fetch();
    }
  } catch (e) {
    let message;

    switch (e?.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 405:
      case 408:
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
        message = t(`error.network.${e.status}`);
        break;

      default:
        message = t(`error.network.unknown`);
        break;
    }

    $q.notify({
      message,
      icon: 'mdi-information',
      position: 'top',
      type: 'negative',
    });
  }

  try {
    if (!userStore.user) {
      await userStore.fetchUserInfo();
      joinChannel();
    }

    await router.push({ name: 'Home' });
  } catch (_) {}
}
</script>
