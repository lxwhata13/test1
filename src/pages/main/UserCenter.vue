<template>
  <q-page class="UserCenter_page">
    <div class="user_one">
      <ul>
        <li>
          <router-link :to="{ name: 'Avatar' }">
            <q-img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </router-link>
          <span v-if="isBackActivityUser"></span>
        </li>
        <li>
          <p>tester</p>
          <p>ID: 26236</p>
        </li>
        <li>
          <router-link class="text-capitalize" :to="{ name: 'Messages' }">
            <q-badge
              v-if="userStore.unreadMessageCount > 0"
              color="red"
              rounded
              floating
            />
            {{ t("common.messages") }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="user_three">
      <ul>
        <li>
          <q-btn @click="() => gotoRecharge()">
            {{ t("common.recharge") }}
          </q-btn>
        </li>
        <li>
          <router-link class="text-capitalize" :to="{ name: 'WithdrawBank' }">
            {{ t("common.wallet") }}
          </router-link>
        </li>
        <li>
          <q-btn
            :label="t('common.checkIn')"          
            @click="() => showDailySignupDialog()"
          >
            <q-badge
              class="button-badge"
              v-if="!userStore.alreadySignupToday"
              color="red"
              rounded
              floating
            />
          </q-btn>
        </li>
      </ul>
    </div>

    <div class="user_two">
      <ul>
        <li>
          <router-link to="/vip">
            {{ $t("vip.slogan", { level: nextVipLevel }) }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="user_five">
      <ul>
        <li>
          <router-link :to="{ name: 'Settings' }">
            {{ t("common.settings") }}
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link :to="{ name: 'StreamRecords' }">
            {{ t("routes.title.StreamRecords") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'BetRecords' }">
            {{ t("routes.title.BetRecords") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Team' }">
            {{ t("common.myTeam") }}
          </router-link>
        </li>
        <!-- <li>
          <a @click="() => downloadApp(configStore)">
            {{ t("common.download") }}
          </a>
        </li> -->
      </ul>
    </div>

    <StickyCustomerService />
    <StickyBackActivityService />
  </q-page>
</template>

<script setup>
import { computed, onActivated, onMounted, onBeforeUnmount, ref } from 'vue';
import { useI18n } from "src/boot/i18n";
import StaticImage from "components/StaticImage.vue";
import { downloadApp, gotoRecharge, showDailySignupDialog } from "src/utils";
import { useUserStore } from "src/store/userStore";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import { useConfigStore } from "src/store/configStore";
import StickyBackActivityService from 'src/components/StickyBackActivityService.vue';
import { isInTimeRange } from 'src/utils'

const { t } = useI18n();
const userStore = useUserStore();
const configStore = useConfigStore();

const nextVipLevel = computed(() =>
  Math.min(userStore.user.vipLevel + 1, configStore.maxVipLevel)
);

const isBackActivityUser = ref(false);

const timerId = ref(null);;


</script>
