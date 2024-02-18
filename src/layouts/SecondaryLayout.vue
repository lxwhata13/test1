<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      v-if="
        currentRoute.name !== 'Recharge' &&
        currentRoute.name !== 'WithdrawBank' &&
        currentRoute.name !== 'Messages' &&
        currentRoute.name !== 'Game' 
      "
    >
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          @click="() => (configStore.prevRoute ? go(-1) : replace({ name: 'Home' }))"
          class="icon_left"
        />
        <q-toolbar-title class="text-capitalize">
          {{ $t(`routes.title.${currentRoute.name}`, currentRoute.params) }}
        </q-toolbar-title>
      </q-toolbar>

      <PcSysHeader />

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useConfigStore } from "src/store/configStore";
import PcSysHeader from "src/components/PcSysHeader.vue";

const configStore = useConfigStore();
const { currentRoute, go, replace } = useRouter();
</script>

<style lang="scss" scoped></style>
