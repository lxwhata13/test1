<template>
  <q-page class="Sys_page">
    <div class="back_activity">
      <div class="Location Pc">
        <ul>
          <li>
            <q-btn flat round dense @click="$router.go(-1)" />
          </li>
          <li>{{ t("routes.title.BackActivity") }}</li>
        </ul>
      </div>
      <div class="title_img">
        <p>Retorno do usuário</p>
        <p>Participe de eventos e receba brindes</p>
      </div>
      <div class="activity_time">
        <span class="content">
          {{ timeRange }}
        </span>
      </div>
      <div class="Sys_Pcbox">
        <div class="back_player">
          <div class="back_player_box" v-html="backPlayerDesc"></div>
        </div>
        <div class="back_player">
          <div class="back_player_box">
            <ul>
              <li><q-img src="~assets/AppSkinD/images/System/Pic_06.png" /></li>
              <li>{{ t("activity.title.backRedPacket") }}</li>
              <li><div class="desc" v-html="backPacketDesc"></div></li>
              <li>
                <q-btn
                  @click="onGetReward"
                  :disable="disableGetReward"
                  :class="{ disabled: disableGetReward }"
                >
                  {{ t("common.receive") }}
                </q-btn>
              </li>
            </ul>
          </div>
        </div>
        <div class="back_player">
          <div class="back_player_box">
            <ul>
              <li><q-img src="~assets/AppSkinD/images/System/Pic_07.png" /></li>
              <li>{{ t("activity.title.backRechargeActivity") }}</li>
              <li><div class="desc" v-html="activityDesc"></div></li>
              <li>
                <q-btn @click="gotoRecharge">
                  {{ t("common.recharge") }}
                </q-btn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <PcCopyright />
  </q-page>
</template>

<script setup>
import { useConfigStore } from "src/store/configStore";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import { computed } from "vue";
import { throttle, useQuasar } from "quasar";
import { Mutation } from "src/graphql";
import { apolloClient } from "src/apolloClient";
import { gotoRecharge } from "src/utils";
import { TIMEZONE } from "src/utils/constants";
import PcCopyright from "src/components/PcCopyright.vue";

const configStore = useConfigStore();
const userStore = useUserStore();

const { t } = useI18n();
const $q = useQuasar();

const disableGetReward = computed(() => {
  return (
    userStore.user.backActivityBuff - Math.floor(Date.now() / 1000) <= 0 ||
    userStore.user.backActivityRedPacketStatus != "can_receive"
  );
});

let rechargeBackActivityConfig = configStore.sysConfig.rechargeBackActivityConfig;

function pad(num) {
  return num.toString().padStart(2, "0");
}

function utcToSaoPauloTime(dateTime) {
  const utcDate = new Date(dateTime);
  const saoPauloTime = new Date(utcDate.toLocaleString("en-US", { timeZone: TIMEZONE }));

  const formattedTime = `
  ${saoPauloTime.getFullYear()}-${pad(saoPauloTime.getMonth() + 1)}-${pad(
    saoPauloTime.getDate()
  )}
  ${pad(saoPauloTime.getHours())}:${pad(saoPauloTime.getMinutes())}:${pad(
    saoPauloTime.getSeconds()
  )}
`;
  return formattedTime;
}

const timeRange = computed(() => {
  let beginTime = utcToSaoPauloTime(rechargeBackActivityConfig.begin_time);
  let endTime = utcToSaoPauloTime(rechargeBackActivityConfig.end_time);
  return beginTime + "~" + endTime;
});

const backPlayerDesc = rechargeBackActivityConfig.player_desc;
const backPacketDesc = rechargeBackActivityConfig.red_packet_desc;
const activityDesc = rechargeBackActivityConfig.activity_desc;

const onGetReward = throttle(async () => {
  if (
    userStore.user.backActivityBuff - Math.floor(Date.now() / 1000) > 0 &&
    userStore.user.backActivityRedPacketStatus == "can_receive"
  ) {
    const res = await apolloClient.mutate({
      mutation: Mutation.receiveBackActivityRedPacket,
    });

    userStore.user.balance = res.balance;
    userStore.user.withdrawPoint = res.withdrawPoint;
    userStore.user.effectiveWithdrawPoint = res.effectiveWithdrawPoint;
    userStore.user.requiredWithdrawPoint = res.requiredWithdrawPoint;
    userStore.user.requiredWithdrawPointFix = res.requiredWithdrawPointFix;
    userStore.user.backActivityRedPacketStatus = res.backActivityRedPacketStatus;

    $q.notify({
      message: t("activity.message.receive_success"),
      timeout: 1000,
      icon: "mdi-information",
      position: "top",
      type: "positive",
    });
  } else {
    $q.notify({
      message: t("activity.message.activity_end"),
      timeout: 1000,
      icon: "mdi-information",
      position: "top",
      type: "positive",
    });
  }
}, 1000);
</script>

<style lang="scss" scoped></style>
