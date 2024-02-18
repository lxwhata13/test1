<template>
  <q-page class="profile_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.PixWallet") }}</li>
      </ul>
    </div>
    <WalletForm @submit="onSubmit" />
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { useI18n } from 'src/boot/i18n';
import router from 'src/router';
import WalletForm from "./PixWalletForm.vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "src/store/configStore";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
//const router = useRouter();
const configStore = useConfigStore();

async function onSubmit() {
  configStore.prevRoute ? router.go(-1) : router.replace({ name: "Profile" });
}
</script>
