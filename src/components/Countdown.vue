<template>
  <p v-if="isFinish">
    {{ t('common.countdown') }}:
    <span>{{ t('common.over') }}</span>
  </p>

  <vue-countdown
    v-if="!isFinish"
    :time="timeLeft"
    :interval="1000"
    v-slot="{ days, hours, minutes, seconds }"
  >
    <p>
      {{ t('common.countdown') }}:
      <span>{{ days }}</span>
      {{ t('common.days') }}
      <span>{{ pad(hours) }}</span>
      :
      <span>{{ pad(minutes) }}</span>
      :
      <span>{{ pad(seconds) }}</span>
    </p>
  </vue-countdown>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { pad } from 'src/utils';
import VueCountdown from '@chenfengyuan/vue-countdown';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TIMEZONE } from 'src/utils/constants';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TIMEZONE);

const { t } = useI18n();

const props = defineProps({
  endDate: {
    type: String,
  },
});

const isFinish = computed(() => {
  if (!props.endDate) return false;
  let now = dayjs().unix();

  const end = dayjs.tz(`${props.endDate} 00:00:00.000`).add(1, 'days').unix();
  return end - now < 0;
});

const timeLeft = computed(() => {
  if (!props.endDate) return 0;
  const now = dayjs().valueOf();
  const end = dayjs
    .tz(`${props.endDate} 00:00:00.000`)
    .add(1, 'days')
    .valueOf();

  return end - now;
});
</script>
