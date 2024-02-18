<template>
  <q-page class="Sys_page Sys_page_two">
    <div class="Location Pc">
      <ul>
        <li>
          <router-link to="/">
            <span>{{ t("routes.nav.home") }}</span>
          </router-link>
        </li>
        <li>{{ $t(`routes.title.${currentRoute.name}`, currentRoute.params) }}</li>
      </ul>
    </div>
    <div class="TabGames_one">
      <q-tabs v-model="tab" inline-label outside-arrows mobile-arrows>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_03.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_04.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_05.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_06.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_07.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_08.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
        <q-tab>
          <router-link to="/showGame">
          <ul class="Ul_game Hot">
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_09.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        </q-tab>
      </q-tabs>
    </div>
    <div class="MoreGameList">
      <div class="MoreGameList_box">
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_05.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_06.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_07.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_08.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_09.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_10.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_11.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_12.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_13.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_14.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_15.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_16.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_17.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
        <router-link to="/showGame">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/List/list_18.png" alt="" />
            </li>
            <li>
              <p>Ultimate Striker</p>
              <p>PG</p>
            </li>
            <li>
              <span>{{ t("common.play") }}</span>
            </li>
          </ul>
        </router-link>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useConfigStore } from "src/store/configStore";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { Query } from "src/graphql";
import PcCopyright from "src/components/PcCopyright.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import NoSleep from "nosleep.js/dist/NoSleep.min.js";

const { currentRoute, push } = useRouter();

const { t } = useI18n();
const configStore = useConfigStore();
</script>

<style lang="scss" scoped></style>
