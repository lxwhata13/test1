<template>
  <q-page class="Sys_page">

    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.WithdrawRecords") }}</li>
      </ul>
    </div>

    <q-list class="Profile_list">
      <q-item clickable v-ripple :to="{ name: 'Avatar' }">
        <q-item-section>{{ $t('profile.label.avatar') }}</q-item-section>
        <q-item-section side>
          <div class="row flex-center q-gutter-md">
            <q-avatar color="secondary" text-color="white" size="md">
              <q-img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
            </q-avatar>
          </div>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{ $t('profile.label.nickname') }}</q-item-section>
        <q-item-section side>
          <q-item-label>{{ userStore.user.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>{{ $t('profile.label.mobile') }}</q-item-section>
        <q-item-section side>
          <q-item-label>{{ maskMobile(userStore.user.mobile) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: 'BankCard' }" class="icon_right">
        <q-item-section>{{ $t('profile.label.bankCard') }}</q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: 'Password' }" class="icon_right">
        <q-item-section class="text-capitalize">
          {{ $t('profile.label.changePassword') }}
        </q-item-section>
      </q-item>
      <!-- <q-item
        clickable
        v-ripple
        :to="{ name: 'FundPassword' }"
        class="icon_right"
      >
        <q-item-section>{{ $t('profile.label.fundPassword') }}</q-item-section>
      </q-item> -->
      <q-item class="icon_right">
        <q-item-section>{{ t('profile.label.selectLanguage') }}</q-item-section>
        <q-select
          filled
          map-options
          emit-value
          v-model="lang"
          :options="options"
          options-cover
          behavior="menu"
          :popup-content-style="{ backgroundColor: '#111F41' }"
          stack-label
        />
      </q-item>
      <!-- <q-item clickable v-ripple :to="{ name: 'FundPassword' }">
        <q-item-section>Sound</q-item-section>
        <q-toggle v-model="value" />
      </q-item> -->
    </q-list>
    <div class="Profile_list Mo">
      <q-btn @click="handleLogout" :label="$t('common.logout')" flat />
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { useUserStore } from 'src/store/userStore';
import { useAuthStore } from 'src/store/authStore';
import StaticImage from 'components/StaticImage.vue';
import router from 'src/router';
import { leaveChannel } from 'src/boot/channel';
import { maskMobile } from 'src/utils';
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();

const userStore = useUserStore();
const authStore = useAuthStore();

async function handleLogout() {
  userStore.logout();
  authStore.logout();
  leaveChannel();
  router.push({ name: 'Login' });
}
const lang = ref('es-MX');
const options = [
  {
    label: 'Espanhol',
    value: 'es-MX',
  },
];
const value = ref(true);
</script>
