<template>
  <q-page-sticky
    position="right"
    :offset="[0, 0]"
    class="Sys_back_Activity"
    v-if="isShow"
  >
    <q-btn to="/backActivity"> &nbsp; </q-btn>
    <p>
      <span>{{ left_buff_duration }}</span>
    </p>
  </q-page-sticky>
</template>

<script setup>
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from 'src/store/configStore';
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { isInTimeRange } from 'src/utils'

const userStore = useUserStore();
const configStore = useConfigStore();

const timerId = ref(null);

let convertSecondsToTime = function (seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const left_buff_duration = ref(null);

const isShow = computed(() => {
  let leftSeconds = userStore.user.backActivityBuff - Math.floor(Date.now() / 1000);
    if (leftSeconds > 0) {
     return configStore.sysConfig.rechargeBackActivityConfig
        && configStore.sysConfig.rechargeBackActivityConfig.show_switch
       && userStore.alreadyShowBackActivity
       && isInTimeRange(configStore.sysConfig.rechargeBackActivityConfig.begin_time, configStore.sysConfig.rechargeBackActivityConfig.end_time)
        && left_buff_duration.value != "0:00:00"
    } else {
      return false;
    }
});

onMounted(() => {
  timerId.value = setInterval(() => {
    let leftSeconds = userStore.user.backActivityBuff - Math.floor(Date.now() / 1000);
    if (leftSeconds > 0) {
      left_buff_duration.value = convertSecondsToTime(leftSeconds);
    } else {
      left_buff_duration.value = "0:00:00";
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerId.value !== null) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
});
</script>

<style lang="scss" scoped></style>
