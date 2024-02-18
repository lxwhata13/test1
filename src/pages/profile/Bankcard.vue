<template>
  <q-page lass="profile_page">
     <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.BankCard") }}</li>
      </ul>
    </div>
    <BankcardForm @submit="onSubmit" />
    <PcCopyright />
  </q-page>
</template>

<script setup>
import BankcardForm from './BankcardForm.vue';
import { useI18n } from 'src/boot/i18n';
import { useRouter } from 'vue-router';
import { useConfigStore } from 'src/store/configStore';
import PcCopyright from "src/components/PcCopyright.vue";

const router = useRouter();
const configStore = useConfigStore();

const { t } = useI18n();
async function onSubmit() {
  configStore.prevRoute ? router.go(-1) : router.replace({ name: 'Profile' });
}
</script>
