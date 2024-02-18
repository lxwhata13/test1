<template>
  <q-header>
    <q-toolbar>
      <q-btn flat round dense @click="this.$router.back()" class="icon_left" />
      <q-toolbar-title>lucky roulette</q-toolbar-title>
      <q-btn @click="fixed = true" class="icon_right icon_2" />
    </q-toolbar>
  </q-header>
  <q-page class="Sys_page">
    <!--  -->
    <div class="game_top">
      <img
        src="~assets/images/System_Qapp/game_1.png"
        alt=""
        class="img_sides"
      />
    </div>
    <!--  -->
    <div class="game_choose">
      <div class="game_choose_one">
        <ul>
          <li>BRL 1</li>
          <li>
            <router-link to="/recharge">
              BRL
              <span>965.2</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="game_radio">
        <q-radio v-model="shape1" val="shape1_1">
          <p>1/2</p>
        </q-radio>
        <q-radio v-model="shape1" val="shape1_2">
          <p>x2</p>
        </q-radio>
        <q-radio v-model="shape1" val="shape1_3">
          <p>Minimum</p>
        </q-radio>
        <q-radio v-model="shape1" val="shape1_4">
          <p>Maximum</p>
        </q-radio>
      </div>
      <div class="game_radio game_radio_b">
        <q-radio v-model="shape2" val="shape2_1">
          <p>
            <i class="game_icon game_icon_1">&nbsp;</i>
            Win 2X
          </p>
        </q-radio>
        <q-radio v-model="shape2" val="shape2_2">
          <p>
            <i class="game_icon game_icon_2">&nbsp;</i>
            Win 14X
          </p>
        </q-radio>
        <q-radio v-model="shape2" val="shape2_3">
          <p>
            <i class="game_icon game_icon_3">&nbsp;</i>
            Win 2X
          </p>
        </q-radio>
      </div>
    </div>
    <!--  -->
    <div class="game_listbox">
      <q-tabs v-model="Game_tabs" inline-label class="Game_tabs">
        <q-tab name="Game_tabs_1" label="Full story" />
        <q-tab name="Game_tabs_2" label="My bet" />
      </q-tabs>
      <q-tab-panels v-model="Game_tabs" animated class="Game_tabs_panels">
        <q-tab-panel name="Game_tabs_1">
          <ul class="game_title">
            <li>Time</li>
            <li>Period</li>
            <li>Result</li>
          </ul>
          <div class="game_list">
            <!-- <div class="No_data">
              <p>&nbsp;</p>
              No data
            </div> -->
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>202301082647</li>
              <li><i class="game_icon game_icon_1">&nbsp;</i></li>
            </ul>
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>202301082647</li>
              <li><i class="game_icon game_icon_2">&nbsp;</i></li>
            </ul>
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>202301082647</li>
              <li><i class="game_icon game_icon_3">&nbsp;</i></li>
            </ul>
          </div>
        </q-tab-panel>
        <q-tab-panel name="Game_tabs_2">
          <ul class="game_title game_title_b">
            <li>Time</li>
            <li>Model</li>
            <li>Bet</li>
            <li>Result</li>
          </ul>
          <div class="game_list game_list_b">
            <!-- <div class="No_data">
              <p>&nbsp;</p>
              No data
            </div> -->
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>
                <i class="game_icon game_icon_1">&nbsp;</i>
                <span>X14</span>
              </li>
              <li>1</li>
              <li><span class="c-yellow">+13.74</span></li>
            </ul>
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>
                <i class="game_icon game_icon_2">&nbsp;</i>
                <span>X2</span>
              </li>
              <li>1</li>
              <li><span class="c-red">-1.74</span></li>
            </ul>
            <ul>
              <li>2023-01-08 22:52:34</li>
              <li>
                <i class="game_icon game_icon_3">&nbsp;</i>
                <span>X1</span>
              </li>
              <li>1</li>
              <li><span class="c-red">-3.74</span></li>
            </ul>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- 弹窗 -->
    <q-dialog v-model="fixed" class="Sys_q_dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Game instructions</div>
          <q-btn flat label="close" class="btn_close" v-close-popup />
        </q-card-section>
        <q-card-section style="max-height: 85vh" class="scroll hide-scrollbar">
          <!--  -->
          <div class="Wallets_dialog">
            1.First deposit after registration ≥ 5OR$ to get 50%bonus, up to
            10OOR$,limited to 1time
            <br />
            2.Deposit ≥ 100 get 8% bonus and get
            <br />
            3.times a day
          </div>
          <!--  -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { ref, watchEffect, watch } from 'vue';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import router from 'src/router';

const userStore = useUserStore();
const configStore = useConfigStore();
// lurong
const fixed = ref(false); //true
const shape1 = ref('shape1_1');
const shape2 = ref('shape2_1');
const Game_tabs = ref('Game_tabs_1');
</script>

<style lang="scss" scoped></style>
