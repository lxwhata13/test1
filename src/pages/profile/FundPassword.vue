<template>
  <q-page>
    <FundPasswordForm @submit="onSubmit" />
  </q-page>
</template>

<script setup>
import FundPasswordForm from './FundPasswordForm.vue';
import { useRouter } from 'vue-router';
import { useConfigStore } from 'src/store/configStore';

const router = useRouter();
const configStore = useConfigStore();

async function onSubmit() {
  configStore.prevRoute ? router.go(-1) : router.replace({ name: 'Profile' });
}
</script>
