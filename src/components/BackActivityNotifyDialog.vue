<template>
  <q-dialog v-model="isShow" persistent>
    <q-card dark class="Qdialog-Activity">
      <ul>
        <li>Retorno do usuário</li>
        <li>Participe de eventos e receba brindes</li>
        <li>
          <q-btn flat v-close-popup color="yellow" @click="router.push({ name: 'BackActivity' });">
            {{ $t("common.ok") }}
          </q-btn>
        </li>
      </ul>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import router from 'src/router';

const userStore = useUserStore();

const { t } = useI18n();
//6秒钟关闭
const timeDownCloseSeconds = ref(6);

const timerId = ref(null);
const isShow = ref(true);

onMounted(() => {
  timerId.value = setInterval(() => {
    timeDownCloseSeconds.value--;
    if (timeDownCloseSeconds.value == 0) {
      clearInterval(timerId.value);
      timerId.value = null;
      isShow.value = false;
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerId.value !== null) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
  userStore.setAlreadyShowBackActivity(true);
});
</script>
