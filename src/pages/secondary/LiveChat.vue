<template>
  <q-page class="Sys_page">
    <LiveChatWidget
      :license="currentRoute.params.licenseId"
      visibility="maximized"
      :customerName="`${userStore.user?.id}`"
    />
  </q-page>
</template>

<script setup>
import { LiveChatWidget } from '@livechat/widget-vue';
import { useUserStore } from 'src/store/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const { currentRoute } = useRouter();
</script>
