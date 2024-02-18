<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <img
        alt="404 not found"
        src="~assets/images/error-404.svg"
        style="width: 200px; height: 200px"
      />
      <div class="text-h2">404</div>
      <div class="text-body1">{{ t('error.hint.404') }}</div>
      <q-btn
        class="q-mt-xl"
        color="primary"
        to="/home"
        :label="t('common.goHome')"
        style="line-height: 35px; height: 35px; width: 100px"
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'src/boot/i18n';
const { t } = useI18n();
</script>
