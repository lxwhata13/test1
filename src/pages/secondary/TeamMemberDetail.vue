<template>
  <q-page class="Sys_page">
    <div class="team_ul team_ul_top">
      <ul class="top">
        <li class="avatar">
          <p><img src="~assets/images/System_Qapp/Avatar_1.png" alt="" /></p>
          <p>Mike YY</p>
          <p>
            Registration:
            <span>2020-07-08</span>
          </p>
          <p>
            Number of Teams:
            <span>0</span>
            team bets:
            <span>0</span>
          </p>
        </li>
        <li class="three">
          <p>
            <span>0</span>
            Team top-ups
          </p>
          <p>
            <span>0</span>
            Team top-ups
          </p>
          <p>
            <span>0</span>
            Team top-ups
          </p>
        </li>
      </ul>
    </div>
    <div class="Sys_main Sys_main_level_details">
      <div class="q-pa-md scroll-y hide-scrollbar">
        <q-infinite-scroll class="Record_list_ul">
          <!-- <div class="No_data">
            <p>&nbsp;</p>
            No data
          </div> -->
          <ul>
            <li>
              <p>Third Party Distribution</p>
              <p>2022-12-28 04:14:15</p>
            </li>
            <li class="c-yellow">+7.80</li>
          </ul>
          <ul>
            <li>
              <p>Share third</p>
              <p>2022-12-28 04:14:15</p>
            </li>
            <li class="c-red">-10.000</li>
          </ul>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { ref, watchEffect, watch } from 'vue';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import FundPasswordForm from '../profile/FundPasswordForm.vue';
import router from 'src/router';

const userStore = useUserStore();
const configStore = useConfigStore();

// lurong
const date = ref('2023/02/06');
</script>

<style lang="scss" scoped></style>
