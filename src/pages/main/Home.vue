<template>
  <q-page class="Home_page">
    <div class="Home_top_four">
      <div class="Home_banner">
        <div class="Home_banner_box">
          <q-carousel
            animated
            v-model="slide"
            navigation
            infinite
            autoplay
            transition-prev="slide-right"
            transition-next="slide-left"
          >
            <q-carousel-slide :name="1" img-src="">
              <div class="slide_box">
                <q-img
                  src="~assets/AppSkinD/upload/Banner/Banner_01.png"
                  :ratio="750 / 300"
                  width="100%"
                  fit="fill"
                  loading="eager"
                  no-spinner
                  alt=""
                />
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" img-src="">
              <div class="slide_box">
                <q-img
                  src="~assets/AppSkinD/upload/Banner/Banner_02.png"
                  :ratio="750 / 300"
                  width="100%"
                  fit="fill"
                  loading="eager"
                  no-spinner
                  alt=""
                />
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="3" img-src="">
              <div class="slide_box">
                <q-img
                  src="~assets/AppSkinD/upload/Banner/Banner_03.png"
                  :ratio="750 / 300"
                  width="100%"
                  fit="fill"
                  loading="eager"
                  no-spinner
                  alt=""
                />
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="4" img-src="">
              <div class="slide_box">
                <q-img
                  src="~assets/AppSkinD/upload/Banner/Banner_04.png"
                  :ratio="750 / 300"
                  width="100%"
                  fit="fill"
                  loading="eager"
                  no-spinner
                  alt=""
                />
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="5" img-src="">
              <div class="slide_box">
                <q-img
                  src="~assets/AppSkinD/upload/Banner/Banner_05.png"
                  :ratio="750 / 300"
                  width="100%"
                  fit="fill"
                  loading="eager"
                  no-spinner
                  alt=""
                />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="Home_MarqueeX">
        <div class="Home_MarqueeX_box">
          <i></i>
          <MarqueeX :message="t('server.homeNoticeRotation')" />
        </div>
      </div>
      <div class="Home_menu">
        <ul class="Mo">
          <li v-for="item in navLinks" :key="item.title">
            <router-link :to="item.to">
              <span>{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
        <ol class="Pc">
          <li>
            <router-link to="/promotion">
              <span>{{ t("routes.nav.promotion") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/rewards">
              <span>{{ t("routes.nav.rewards") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/TournamentList">
              <span>{{ t("routes.title.TournamentList") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/vip">
              <span>{{ t("routes.title.Vip") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/deposit">
              <span>{{ t("common.recharge") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/withdrawBank">
              <span>{{ t("common.wallet") }}</span>
            </router-link>
          </li>
          <li>
            <q-btn :label="t('common.checkIn')" @click="() => showDailySignupDialog()">
              <q-badge
                class="button-badge"
                v-if="!userStore.alreadySignupToday"
                color="red"
                rounded
                floating
              />
            </q-btn>
          </li>
        </ol>
      </div>
    </div>
    <TournamentBanner />
    <GameList />
    <div class="Home_Links_two Mo">
      <ul>
        <li v-for="item in configStore.localCooperationSites" :key="item.id">
          <p><img :src="item.image" alt="" /></p>
        </li>
      </ul>
    </div>
    <div class="Home_help Mo">
      <div class="box">Este sitio ofrece juegos con una experiencia de aventura. Para ser usuario de nuestra web debes tener al menos 18 años. No somos responsables de violar las leyes locales con respecto a los juegos en línea. Espero que juegues responsablemente y te diviertas en nuestra plataforma.</div>
    </div>
    <StickyBackActivityService />
    <StickyCustomerService />
    <PcCopyright />
    <q-dialog v-model="showNotice" persistent class="Sys_dialog">
      <q-card>
        <q-card-section class="Sys_dialog_title">
          <div class="name">
            {{ notice.title }}
          </div>
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="() => showUnreadNotice()"
          />
        </q-card-section>
        <q-card-section class="scroll">
          <div class="Sys_dialog_content" v-html="notice.content"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onActivated, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useConfigStore } from "src/store/configStore";
import { useUserStore } from "src/store/userStore";
import { useAuthStore } from "src/store/authStore";
import {
  gotoCarouselLink,
  showDailySignupDialog,
  showBackActivityNotifyDialog,
} from "src/utils";
import GameList from "src/components/ScrollableGameList.vue";
import MarqueeX from "src/components/MarqueeX.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";
import TournamentBanner from "src/components/TournamentBanner.vue";

import logoPopularGames from "assets/AppSkinD/images/Home/game_icon_02.png";
import StickyBackActivityService from "src/components/StickyBackActivityService.vue";
import { isInTimeRange } from "src/utils";
// import logoFavoriteGames from 'assets/AppSkinD/images/Home/game_icon_01.png';

const { t } = useI18n();
const userStore = useUserStore();
const configStore = useConfigStore();
const authStore = useAuthStore();

const slide = ref(1);
const autopla = ref(true);

const showNotice = ref(false);
const notice = ref(null);

const navLinks = [
  { to: { name: "Rewards" }, title: t("routes.nav.rewards") },
  { to: { name: "Recharge" }, title: t("common.recharge") },
  { to: { name: "Vip" }, title: t("routes.title.Vip") },
  { to: { name: "Promotion" }, title: t("common.invite") },
];

</script>

<style lang="scss" scoped></style>
