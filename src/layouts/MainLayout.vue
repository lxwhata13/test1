<template>
  <q-layout view="hHh lpR fFf">
    <div class="Main_Header">
      <!-- Pc -->
      <div class="Pc_Sys_Header">
        <q-btn :icon="menuIcon" @click="() => showMenu()" class="left_menu"></q-btn>
        <q-toolbar class="Pc_Sys_Header_box">
          <div class="Pc_Sys_Header_box_Logo">
            <router-link to="/">
              <img src="~assets/AppSkinD/images/Login_01.png" alt="" />
            </router-link>
          </div>
          <ul class="Mo">
            <li>
              <q-btn to="/login">
                {{ t("account.label.signIn") }}
              </q-btn>
            </li>
            <li>
              <q-btn to="/register">
                {{ t("account.label.signUp") }}
              </q-btn>
            </li>
          </ul>
          <ol class="Pc">
            <li>
              <q-btn @click="() => gotoRecharge()"> 100.00 </q-btn>
            </li>
            <li>
              <div class="liuser">
                <p><img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" /></p>
                <q-btn-dropdown stretch flat label="Dropdown">
                  <q-list class="Dropdown_box">
                    <ul>
                      <li><img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" /></li>
                      <li>tester</li>
                      <li>ID: 26236</li>
                    </ul>
                    <ol>
                      <li>
                        <q-btn @click="() => gotoRecharge()">
                          {{ t("common.recharge") }}
                        </q-btn>
                      </li>
                      <li>
                        <router-link :to="{ name: 'Withdraw' }">
                          {{ t("common.wallet") }}
                        </router-link>
                      </li>
                    </ol>
                    <ol>
                      <li>
                        <router-link :to="{ name: 'Settings' }">
                          {{ t("common.settings") }}
                        </router-link>
                      </li>
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
                    </ol>
                    <ol>
                      <li>
                        <q-btn @click="handleLogout" :label="$t('common.logout')" flat />
                      </li>
                    </ol>
                  </q-list>
                </q-btn-dropdown>
              </div>
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
          </ol>
        </q-toolbar>
      </div>
    </div>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-drawer
      side="left"
      v-model="menuVisible"
      behavior="mobile"
      dark
      bordered
      overlay
      :width="280"
      :mini-width="280"
    >
      <SideMenu />
    </q-drawer>

    <q-footer elevated class="Sys_footer_tabs" style="height: 55px">
      <q-tabs switch-indicator dense>
        <template v-for="tab in tabs" :key="tab.path">
          <q-route-tab
            :to="tab.path"
            :name="tab.path"
            :label="t(`routes.nav.${tab.path}`)"
            :icon="tab.icon"
            no-caps
          >
            <q-badge
              v-if="
                (tab.path === 'userCenter' && showBadge) ||
                (tab.path === 'rewards' && rewardBadge)
              "
              color="red"
              rounded
              floating
            />
          </q-route-tab>
        </template>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useRouter } from "vue-router";
import { useUserStore } from "src/store/userStore";
import { useAuthStore } from "src/store/authStore";
import { useConfigStore } from "src/store/configStore";
import SideMenu from "src/components/SideMenu.vue";
import StaticImage from "components/StaticImage.vue";
import { gotoRecharge } from "src/utils";
import { leaveChannel } from "src/boot/channel";

const { t } = useI18n();
const router = useRouter();

const userStore = useUserStore();
const configStore = useConfigStore();
const authStore = useAuthStore();

const menuVisible = ref(false);

const menuIcon = computed(() => {
  return menuVisible.value === true ? "iconfont:icon-fanhui" : "iconfont:icon-jiantou";
});

const tabs = [
  { path: "home", icon: "iconfont:icon-shouye_xingzhuang" },
  { path: "promotion", icon: "iconfont:icon-zhengquangongsi" },
  { path: "rewards", icon: "iconfont:icon-dingdan" },
  { path: "userCenter", icon: "iconfont:icon-wode" },
];

const showMenu = () => {
  if (!authStore.accessToken) {
    router.push({ name: "Login" });
  } else {
    menuVisible.value = !menuVisible.value;
  }
};

const showBadge = computed(() => {
  return (
    !!authStore.accessToken &&
    (userStore.unreadMessageCount > 0 ||
      (configStore.sysConfig.dailySignupMode === "open" && !userStore.alreadySignupToday))
  );
});

const rewardBadge = computed(() => {
  if (!authStore.accessToken) return false;

  const promotionReward = userStore.generalPromotionRewards.length > 0;

  const teamCommission = userStore.teamCommission.find(
    (item) => item.clearStatus === "init" && item.amount > 0
  );

  const vipRebate = userStore.teamCommission.find(
    (item) => item.clearStatus === "init" && item.amount > 0
  );

  const hasLossBenefit =
    userStore.lossBenefit.amount > 0 && userStore.lossBenefit.status == "init";

  return promotionReward || !!teamCommission || !!vipRebate || hasLossBenefit;
});

async function handleLogout() {
  userStore.logout();
  authStore.logout();
  leaveChannel();
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
::v-deep(.q-tab) {
  .q-badge {
    right: 30px;
  }
}
</style>
