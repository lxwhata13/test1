<template>
  <q-layout
    view="hHh lpR fFf"
    :class="
      currentRoute.name === 'Login' ? 'Sys_page_LoginLayout_login' : 'Sys_page_LoginLayout'
    "
  >
    <!-- <q-header class="bg-transparent text-grey-8" v-if="currentRoute.name !== 'Register'"> -->
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          @click="() => (configStore.prevRoute ? go(-1) : replace({ name: 'Home' }))"
          class="icon_left"
        />
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
const { currentRoute, replace, go } = useRouter();
const configStore = useConfigStore();
</script>

<style lang="scss" scoped></style>
