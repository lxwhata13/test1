<template>
  <div class="Pc_Sys_Header Pc">
    <q-btn :icon="menuIcon" @click="() => showMenu()" class="left_menu"></q-btn>
    <q-toolbar class="Pc_Sys_Header_box">
      <div class="Pc_Sys_Header_box_Logo">
        <router-link to="/">
          <img src="~assets/AppSkinD/images/Login_01.png" alt="" />
        </router-link>
      </div>
      <ol>
        <li>
          <q-btn @click="() => gotoRecharge()">
            100.00
          </q-btn>
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
              @click="readAllMessages"
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
</template>

<script setup>
import { useRouter } from "vue-router";
import { throttle } from "quasar";
import { useI18n } from "src/boot/i18n";
import StaticImage from "components/StaticImage.vue";
import { getOS, gotoRecharge } from "src/utils";
import { useUserStore } from "src/store/userStore";
import { useAuthStore } from "src/store/authStore";
import { leaveChannel } from 'src/boot/channel';
import { Mutation, Query } from "src/graphql";
import { useMutation } from "@vue/apollo-composable";
const { mutate: readAllSiteMessages } = useMutation(Mutation.readAllSiteMessages);

const { t } = useI18n();
const os = getOS();
const userStore = useUserStore();
const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  userStore.logout();
  authStore.logout();
  leaveChannel();
  router.push({ name: 'Login' });
}

const emit = defineEmits(['OnReadAllMessages']);

const readAllMessages = ()=>{
  emit('OnReadAllMessages');
}

</script>

<style lang="scss" scoped></style>
