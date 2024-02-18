<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense @click="configStore.prevRoute ? go(-1) : replace({ name: 'Home' })" />
        <q-toolbar-title>
          {{ t(`routes.title.${currentRoute.name}`) }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'src/boot/i18n';
import { useConfigStore } from 'src/store/configStore';

const configStore = useConfigStore();
const { currentRoute, go, replace } = useRouter();
const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
