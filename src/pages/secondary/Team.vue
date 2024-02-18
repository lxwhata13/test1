<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Team") }}</li>
      </ul>
    </div>
    <div class="team_one">
      <ul>
        <li>
          <span>{{ t("promotion.totalIncome") }}</span>
          MXN 0
        </li>
        <li>
          <span>{{ t("promotion.totalInvitedUsers") }}</span>
          2
        </li>
        <li>
          <span>{{ t("promotion.totalPromotionBonus") }}</span>
          MXN 0
        </li>
        <li>
          <span>{{ t("promotion.totalCommission") }}</span>
          MXN 0
        </li>
      </ul>
    </div>
    <div class="team_tab">
      <ul class="menu">
        <li>
          <q-btn :class="{ active: level === 0 }" @click="() => (level = 0)">
            {{ t("common.daily") }}
          </q-btn>
        </li>
        <li>
          <q-btn :class="{ active: level === 1 }" @click="() => (level = 1)">
            {{ t("common.level", { n: 1 }) }}
          </q-btn>
        </li>
        <li>
          <q-btn :class="{ active: level === 2 }" @click="() => (level = 2)">
            {{ t("common.level", { n: 2 }) }}
          </q-btn>
        </li>
        <li>
          <q-btn :class="{ active: level === 3 }" @click="() => (level = 3)">
            {{ t("common.level", { n: 3 }) }}
          </q-btn>
        </li>
      </ul>
      <div class="team_list">
        <ul class="stati" v-if="level === 0">
          <li>
            {{ t("common.team") }}
            <span>{{ t("promotion.containLevel123") }}</span>
            <span>3</span>
          </li>
          <li>
            {{ t("common.depositors") }}
            <span>{{ t("promotion.containLevel123") }}</span>
            <span>2</span>
          </li>
          <li>
            {{ t("promotion.totalPromotionBonus") }}
            <span>MXN 0</span>
          </li>
          <li>
            {{ t("promotion.totalCommission") }}
            <span>MXN 0</span>
          </li>
          <li>
            {{ t("promotion.totalIncome") }}
            <span>MXN 0</span>
          </li>
        </ul>

        <div class="datalist_scroll">
          <div class="datalist_scroll_box">
            <ul class="name">
              <li>
                <span>{{ t("common.date") }}</span>
              </li>
              <li>
                <span>{{ t("common.team") }}</span>
              </li>
              <li>
                <span>{{ t("common.depositors") }}</span>
              </li>
              <li v-if="level <= 1">
                <span>{{ t("promotion.inviteRewards") }}</span>
              </li>
              <li>
                <span>{{ t("common.commission") }}</span>
              </li>
            </ul>
            <div class="data">
              <ul  v-for="n in 10" :key="`${n}`">
                <li>2024-02-04</li>
                <li>0</li>
                <li>0</li>
                <li>0</li>
                <li>0</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="No_data" v-if="true">
          <p>&nbsp;</p>
          {{ t("common.noData") }}
        </div> -->
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { ref, reactive, computed, onActivated } from "vue";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import { useQuery } from "@vue/apollo-composable";
import { Query } from "src/graphql";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const level = ref(0);

const listInviteRecords = computed(() => []);

const userStore = useUserStore();
const { t } = useI18n();

// 分页
const current = ref(1);
</script>
