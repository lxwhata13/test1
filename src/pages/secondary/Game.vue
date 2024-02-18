<template>
  <q-page class="showGame_page">
    <q-header>
      <PcSysHeader />
    </q-header>
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn @click="() => replace({ name: 'Home' })" />
        </li>
        <li>Jogo H5, atacante</li>
      </ul>
    </div>

    <div class="showGame_page_iframe">
      <iframe
        src="https://www.jq22.com/demo/djz201702151610/"
        frameborder="0"
        width="100%"
        height="100%"
        scrolling="no"
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      ></iframe>
    </div>

    <q-page-sticky position="top-right" :offset="[16, 16]">
      <q-btn @click="() => replace({ name: 'Home' })" class="ganme_return">
        Return
      </q-btn>
    </q-page-sticky>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Mutation } from "src/graphql";
import { useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useConfigStore } from "src/store/configStore";
import PcSysHeader from "src/components/PcSysHeader.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { currentRoute, go, replace } = useRouter();
const configStore = useConfigStore();

document.body.classList.remove("portrait", "landscape");

currentRoute.value.query.screenOrientation &&
  document.body.classList.add(currentRoute.value.query.screenOrientation);

const $q = useQuasar();
const url = ref(null);

const { mutate: enterGame } = useMutation(Mutation.enterGame);




</script>
