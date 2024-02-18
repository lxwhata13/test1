<template>
  <q-dialog v-bind="$attrs" class="Sys_dialog">
    <q-card>
      <q-card-section class="Sys_dialog_title">
        <div class="name">{{ $t("vip.title.signupReward") }}</div>
        <q-btn flat label="close" v-close-popup />
      </q-card-section>
      <q-card-section class="scroll">
        <!--  -->
        <q-tabs v-model="tab" inline-label class="User_tabs">
          <q-tab name="mails0" label="VIP 0" />
          <q-tab name="mails1" label="VIP 1" />
          <q-tab name="mails2" label="VIP 2" />
          <q-tab name="mails3" label="VIP 3" />
          <q-tab name="mails4" label="VIP 4" />
        </q-tabs>
        <!--  -->
        <div class="User_tabs_panels">
          <div class="q-panel scroll">
            <div class="q-tab-panel">
              <q-radio>
                <p><i>Día 1</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio class="active">
                <p><i>Día 2</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio disable>
                <p><i>Día 3</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio disable>
                <p><i>Día 4</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio disable>
                <p><i>Día 5</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio disable>
                <p><i>Día 6</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio  disable>
                <p><i>Día 7</i></p>
                <p>MXN 0.1</p>
              </q-radio>
              <q-radio disable>
                <p><i>Día 7+</i></p>
                <p>MXN 0.1</p>
              </q-radio>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="User_tab_one">
          <ul>
            <li class="Sys_Btn_Submit">
              <q-btn
                v-close-popup
                @click="onDailySignup"
                :disable="userStore.alreadySignupToday"
              >
                {{
                  userStore.alreadySignupToday
                    ? $t("vip.rewardClaimed")
                    : $t("vip.claimReward")
                }}
              </q-btn>
            </li>
            <li>Incentivos de Registro de Nivel 0 VIP</li>
          </ul>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useConfigStore } from "src/store/configStore";
import { throttle } from "quasar";
import { useUserStore } from "src/store/userStore";
import { Mutation } from "src/graphql";
import { apolloClient } from "src/apolloClient";
import { showBackActivityNotifyDialog } from "src/utils";
import { isInTimeRange } from "src/utils";

const userStore = useUserStore();
const configStore = useConfigStore();

const tab = ref("mails0");
const levelTab = ref();
</script>

<style type="text/scss" scoped></style>
