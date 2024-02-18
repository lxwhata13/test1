<template>
  <div class="Copyright Pc">
    <div class="Copyright_box">
      <div class="Copyright_box_one">
        <ul>
          <li v-for="item in configStore.localCooperationSites" :key="item.id">
            <p><img :src="item.image" alt="" /></p>
          </li>
        </ul>
        <div class="text">Este sitio ofrece juegos con una experiencia de aventura. Para ser usuario de nuestra web debes tener al menos 18 años. No somos responsables de violar las leyes locales con respecto a los juegos en línea. Espero que juegues responsablemente y te diviertas en nuestra plataforma.</div>
      </div>
      <div class="Copyright_box_two">
        <ul>
          <li><img src="~assets/AppSkinD/images/System/Copyright_01.png" alt="" /></li>
          <li>© Copyright All Rights Reserved</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "src/boot/i18n";
import StaticImage from "components/StaticImage.vue";
import { downloadApp, getOS, gotoRecharge } from "src/utils";
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from "src/store/configStore";

const { t } = useI18n();
const os = getOS();
const userStore = useUserStore();
const configStore = useConfigStore();
const { currentRoute } = useRouter();
</script>

<style lang="scss" scoped></style>
