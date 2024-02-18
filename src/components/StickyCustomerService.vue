<template>
  <q-page-sticky position="bottom-right" :offset="[0, 0]" class="Sys_bottom_sticky">
    <q-btn to="/customerService"> &nbsp; </q-btn>
    <q-btn type="a" @click="() => downloadApp(configStore)"> &nbsp; </q-btn>
  </q-page-sticky>
</template>

<script setup>
import { useConfigStore } from "src/store/configStore";
import { downloadApp, getOS } from "src/utils";

const configStore = useConfigStore();
const os = getOS();
</script>

<style lang="scss" scoped></style>
