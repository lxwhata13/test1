<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.CustomerService") }}</li>
      </ul>
    </div>
    <div class="Sys_Pcbox">
      <div class="Service_one">
        <q-btn>
          <p><img src="~assets/AppSkinD/upload/Icon_16.png" alt="" /></p>
          <p>
            <span>Heyley777</span>
            <span>Servicio de atención al cliente en línea</span>
          </p>
        </q-btn>
      </div>    
    </div>

    <PcCopyright />
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from "src/store/configStore";
import { useRouter } from "vue-router";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
const userStore = useUserStore();
const authStore = useAuthStore();
const configStore = useConfigStore();

const { push } = useRouter();

const links = computed(() => {
  if (authStore.accessToken) {
    return userStore.customerServices;
  } else {
    return configStore.customerServices;
  }
});
</script>

<style lang="scss" scoped></style>
