<template>
  <q-scroll-area class="fit q-drawer-scroll">
    <div class="SideMenu_one">
      <ul>
        <li>
          <router-link to="/profile/avatar">
            <!-- <StaticImage :url="userStore.user.avatar" /> -->
          </router-link>
        </li>
        <li>
          <p>{{ userStore.user.name }}</p>
          <p>
            <q-btn @click="() => gotoRecharge()" class="btn_text">
              {{ userStore.user.balance / 100 }}
            </q-btn>
          </p>
        </li>
      </ul>
    </div>
    <div class="SideMenu_two">
      <ul>
        <li v-if="currentRoute.name !== 'Promotion'">
          <router-link to="/promotion">
            {{ t('routes.nav.promotion') }}
          </router-link>
        </li>
        <li v-if="currentRoute.name !== 'UserCenter'">
          <router-link to="/userCenter">
            {{ t('routes.nav.userCenter') }}
          </router-link>
        </li>
        <li>
          <router-link to="/withdrawBank">
            {{ t('routes.title.Withdraw') }}
          </router-link>
        </li>
        <li>
          <router-link to="/vip">{{ t('routes.title.Vip') }}</router-link>
        </li>
        <li v-if="configStore.platform !== 'app'">
          <a v-if="os !== 'android'" @click="downloadApp(configStore)">
            {{ t('common.download') }}
          </a>
          <a v-else :href="configStore.sysConfig.downloadUrl" download>
            {{ t('common.download') }}
          </a>
        </li>
      </ul>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'src/boot/i18n';
import StaticImage from 'components/StaticImage.vue';
import { downloadApp, getOS, gotoRecharge } from 'src/utils';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';

const { t } = useI18n();
const os = getOS();
const userStore = useUserStore();
const configStore = useConfigStore();
const { currentRoute } = useRouter();
</script>

<style lang="scss" scoped></style>
