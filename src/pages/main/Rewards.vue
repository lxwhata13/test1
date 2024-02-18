<template>
  <q-page class="Records_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.nav.records") }}</li>
      </ul>
    </div>
    <div class="Sys_Pcbox">
      <div class="Award">
        <div class="Award_ul">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/Pic_01.34f8c21b.png" />
            </li>
            <li>
              <p>
                Comisión de aye<q-btn @click="showLossBenefitRules">
                  {{ $t("common.illustrate") }}
                </q-btn>
              </p>
            </li>
            <li>
              {{ $t("promotion.lossBenefit") }}:
              <span> MXN 0 </span>
            </li>
            <li>
              La recompensa se depositará en su cuenta al día siguiente. Asegúrese de
              reclamarla en 48 horas, ya que caducará si no lo hace.
            </li>
            <li class="Operar">
              <q-btn
                @click="
                  () =>
                    receiveLossBenefit(
                      userStore.lossBenefit.id,
                      userStore.lossBenefit.amount
                    )
                "
                :disable="
                  userStore.lossBenefit.status !== 'init' ||
                  userStore.lossBenefit.amount === 0
                "
              >
                {{ $t("common.receive") }}
              </q-btn>
            </li>
          </ul>
        </div>
      </div>
      <div class="Award">
        <div class="Award_ul">
          <ul>
            <li>
              <q-img src="~assets/AppSkinD/upload/Pic_02.63cd049d.png" />
            </li>
            <li>
              <p>
                Beneficio por pérdida de ayer<q-btn @click="showLossBenefitRules">
                  {{ $t("common.illustrate") }}
                </q-btn>
              </p>
            </li>
            <li>
              {{ $t("promotion.lossBenefit") }}:
              <span> MXN 0 </span>
            </li>
            <li>
              La recompensa se depositará en su cuenta al día siguiente. Asegúrese de
              reclamarla en 48 horas, ya que caducará si no lo hace.
            </li>
            <li class="Operar">
              <q-btn
                @click="
                  () =>
                    receiveLossBenefit(
                      userStore.lossBenefit.id,
                      userStore.lossBenefit.amount
                    )
                "
              >
                {{ $t("common.receive") }}
              </q-btn>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <PcCopyright />
    <StickyCustomerService />
    <StickyBackActivityService />

    <q-dialog v-model="showRules" class="Sys_dialog">
      <q-card>
        <q-card-section class="Sys_dialog_title">
          <div class="name">{{ $t("common.illustrate") }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="scroll">
          <div>
            La comisión de equipo es la comisión generada por las apuestas válidas de los
            miembros del equipo. Se liquidará al día siguiente y deberá reclamarse en un
            plazo de 48 horas. Si el reclamo ha expirado, no será válido.
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showBonusDialog" class="Sys_dialog">
      <q-card>
        <q-card-section class="scroll">
          <ul class="Sys_dialog_receber">
            <h2>&nbsp;</h2>
            <h3>{{ $t("common.receiveSuccess") }}</h3>
            <li>
              {{ $t("promotion.congratulationOnWinning") }}
              <span>R${{ bonusAmount / 100 }}</span>
            </li>
            <li class="Sys_Btn_Submit">
              <q-btn flat v-close-popup>
                {{ $t("common.ok") }}
              </q-btn>
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>

  <q-dialog
    v-model="showQuestGames"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
    class="Sys_dialog"
  >
    <q-card>
      <q-card-section class="Sys_dialog_title">
        <div class="name">{{ $t("common.illustrate") }}</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="scroll">
        <div
          style="
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            height: 300px;
          "
        >
          <div
            style="padding: 3px; width: 88px; height: 100px"
            v-for="game in questGames"
            :key="game.id"
          >
            <q-img
              :src="game.logo"
              alt=""
              :ratio="1"
              width="68px"
              height="68px"
              fit="fill"
            />
            <div style="text-align: center; font-size: 12px">{{ game.name }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onActivated } from "vue";
import { useI18n } from "src/boot/i18n";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";
// import TreasurePromotionRewardSummary from "src/components/TreasurePromotionRewardSummary.vue";
import { useConfigStore } from "src/store/configStore";
import { useMutation } from "@vue/apollo-composable";
import { Query, Mutation } from "src/graphql";
import { useUserStore } from "src/store/userStore";
import { useQuery } from "@vue/apollo-composable";
import { apolloClient } from "src/apolloClient";
import { useQuasar, throttle } from "quasar";
import { CURRENCY_SYMBOL } from "src/utils/constants";
import StickyBackActivityService from "src/components/StickyBackActivityService.vue";

const $q = useQuasar();

const configStore = useConfigStore();
const userStore = useUserStore();

const { t } = useI18n();

// const treasurePromotionRewardSummary = (activityId) =>
//   userStore.treasurePromotionRewardSummary.find(
//     (item) => item.activityId === activityId,
//   );

const showRules = ref(false);
const rulesText = ref("");
const bonusAmount = ref(0);
const showBonusDialog = ref(false);

// const { mutate: receiveTreasurePromotionReward } = useMutation(
//   Mutation.receiveTreasurePromotionReward,
// );

const { mutate: receiveGeneralPromotionReward } = useMutation(
  Mutation.receiveGeneralPromotionReward
);

const { mutate: receiveVipRebateBonusMutate } = useMutation(
  Mutation.receiveVipRebateBonus
);

const { mutate: receiveTeamCommissionMutate } = useMutation(
  Mutation.receiveTeamCommission
);

const { mutate: receiveLossBenefitMutate } = useMutation(Mutation.receiveLossBenefit);

// const receivePromotionReward = async (activityId) => {
//   if (activityId) {
//     const { data } = await receiveTreasurePromotionReward({ activityId });
//     bonusAmount.value = data.receiveTreasurePromotionReward;
//     showBonusDialog.value = true;
//     await userStore.listTreasurePromotionRewardSummary();
//   }
// };

const receivePromotionReward = async () => {
  const { data } = await receiveGeneralPromotionReward();
  bonusAmount.value = data.receiveGeneralPromotionReward;
  showBonusDialog.value = true;
  await userStore.listGeneralPromotionDailyRewards();
};

const receiveVipRebateBonus = async (rewardId, amount) => {
  if (rewardId) {
    await receiveVipRebateBonusMutate({ rewardId });
    bonusAmount.value = amount;
    showBonusDialog.value = true;
    await userStore.fetchVipRebateBonus();
  }
};

const receiveTeamCommission = async (rewardId, amount) => {
  if (rewardId) {
    await receiveTeamCommissionMutate({ rewardId });
    bonusAmount.value = amount;
    showBonusDialog.value = true;
    await userStore.fetchTeamCommission();
  }
};

const receiveLossBenefit = async (rewardId, amount) => {
  if (rewardId) {
    await receiveLossBenefitMutate({ rewardId });
    bonusAmount.value = amount;
    showBonusDialog.value = true;
    await userStore.fetchLossBenefit();
  }
};

const showTreasurePromotionRules = () => {
  rulesText.value = t("server.treasurePromotionRules");
  showRules.value = true;
};

const showVipRebateRules = () => {
  rulesText.value = t("server.vipRebateRules");
  showRules.value = true;
};

const showTeamCommissionRules = () => {
  rulesText.value = t("server.teamCommissionRules");
  showRules.value = true;
};

const showLossBenefitRules = () => {
  rulesText.value = t("server.lossBenefitRules");
  showRules.value = true;
};

//quests
const result = ref({});
const loading = ref(false);
var refetchQuestList = () => {};

if (configStore.sysConfig.questSysMode == "open") {
  refetchQuestList = async () => {
    loading.value = true;
    let { data: ret } = await apolloClient.query({
      query: Query.listActivedQuestRecords,
      variables: {},
      fetchPolicy: "network-only",
    });

    result.value = ret;
    loading.value = false;
  };

  refetchQuestList();
}

const dailyQuestRecords = computed(() => {
  let ret = [];
  let val = result.value?.listActivedQuestRecords;
  if (!val) return ret;

  let cfgs = val.configs;
  let dailies = val.dailies;

  for (let i = 0; i < cfgs.length; i++) {
    let record = ref({
      counters: 0,
      curLevel: 0,
      status: "RUNNING",
      curPercent: 0,
      bonus: 0,
    });

    let cfg = cfgs[i];
    for (var k in cfg) {
      record.value[k] = cfg[k];
    }

    record.value.bonus = calcBonus(record.value);
    if (cfg.kind == "DAILY") {
      for (let j = 0; j < dailies.length; j++) {
        let rc = dailies[j];
        if (rc.questId == cfg.id) {
          record.value.counters = rc.counters;
          record.value.curLevel = rc.curLevel;
          record.value.status = rc.status;
          record.value.bonus = calcBonus(record.value);
          record.value.curPercent = calcPercent(record.value);
          break;
        }
      }
      ret.push(record);
    }
  }

  return ret;
});

const periodicQuestRecords = computed(() => {
  let ret = [];
  let val = result.value?.listActivedQuestRecords;
  if (!val) return ret;

  let cfgs = val.configs;
  let periodics = val.periodics;

  for (let i = 0; i < cfgs.length; i++) {
    let record = ref({
      counters: 0,
      curLevel: 0,
      status: "RUNNING",
      curPercent: 0,
      bonus: 0,
    });
    let cfg = cfgs[i];
    for (var k in cfg) {
      record.value[k] = cfg[k];
    }

    record.value.bonus = calcBonus(record.value);
    if (cfg.kind == "PERIODIC") {
      for (let j = 0; j < periodics.length; j++) {
        let rc = periodics[j];
        if (rc.questId == cfg.id) {
          record.value.counters = rc.counters;
          record.value.curLevel = rc.curLevel;
          record.value.status = rc.status;
          record.value.bonus = calcBonus(record.value);
          record.value.curPercent = calcPercent(record.value);
          break;
        }
      }
      ret.push(record);
    }
  }

  return ret;
});

const calcLevelProgressTxt = (rc) => {
  let d = Math.min(rc.value.curLevel + 1, rc.value.levels.length);
  let n = rc.value.levels.length;
  return `(${d}/${n})`;
};

const calcPercentTxt = (rc) => {
  let idx = rc.curLevel;
  let counters = rc.counters;
  let request = 0;
  if (idx >= rc.levels.length) {
    request = rc.levels[rc.levels.length - 1].request;
    counters = request;
  } else {
    request = rc.levels[idx].request;
  }

  counters = Math.min(counters, request);

  switch (rc.conditionType) {
    case "PROMOTION":
      return `${counters} / ${request}`;
    case "BETTING":
      return `${counters / 100} / ${request / 100}`;
    case "RECHARGE":
      return `${counters / 100} / ${request / 100}`;
    default:
      return "";
  }
};

const calcPercent = (rc) => {
  let idx = rc.curLevel;
  if (idx >= rc.levels.length) {
    return 100;
  }

  let lv = rc.levels[idx];
  let p = +((rc.counters / lv.request) * 100).toFixed(2);
  return Math.min(100, p);
};

const calcBonus = (rc) => {
  let idx = rc.curLevel;
  if (idx >= rc.levels.length) {
    return 0;
  }

  let lv = rc.levels[idx];
  return lv.bonus;
};

const showQuestGames = ref(false);
const questGames = ref([]);
const showGamesInfo = (rc) => {
  let games = [];
  for (var id of rc.includeGameIds) {
    let game = configStore.games[id];
    if (game) {
      games.push(game);
    }
  }

  questGames.value = games;

  showQuestGames.value = true;
};

const onClickReceiveDailyQuestAwards = async (rc) => {
  if (rc.value.curPercent < 100 || rc.value.status == "RECEIVED") {
    return;
  }

  try {
    bonusAmount.value = rc.value.bonus;
    showBonusDialog.value = true;
    let {
      data: {
        redeemDailyQuestBonus: { user, record },
      },
    } = await apolloClient.mutate({
      mutation: Mutation.redeemDailyQuestBonus,
      variables: { attrs: { quest_id: rc.value.id, level: rc.value.curLevel } },
      fetchPolicy: "network-only",
    });

    rc.value.status = record.status;
    rc.value.curLevel = record.curLevel;
    rc.value.curPercent = calcPercent(rc.value);

    userStore.user.balance = user.balance;
    userStore.user.withdrawPoint = user.withdrawPoint;
    userStore.user.effectiveWithdrawPoint = user.effectiveWithdrawPoint;
    userStore.user.requiredWithdrawPoint = user.requiredWithdrawPoint;
    userStore.user.requiredWithdrawPointFix = user.requiredWithdrawPointFix;

    //refetchList();
  } catch (e) {
    console.log("error:", e);
  }
};

const onClickReceivePeriodicQuestAwards = async (rc) => {
  if (rc.value.curPercent < 100 || rc.value.status == "RECEIVED") {
    return;
  }

  try {
    bonusAmount.value = rc.value.bonus;
    showBonusDialog.value = true;

    let {
      data: {
        redeemPeriodicQuestBonus: { user, record },
      },
    } = await apolloClient.mutate({
      mutation: Mutation.redeemPeriodicQuestBonus,
      variables: { attrs: { quest_id: rc.value.id, level: rc.value.curLevel } },
      fetchPolicy: "network-only",
    });

    rc.value.status = record.status;
    rc.value.curLevel = record.curLevel;
    rc.value.curPercent = calcPercent(rc.value);

    userStore.user.balance = user.balance;
    userStore.user.withdrawPoint = user.withdrawPoint;
    userStore.user.effectiveWithdrawPoint = user.effectiveWithdrawPoint;
    userStore.user.requiredWithdrawPoint = user.requiredWithdrawPoint;
    userStore.user.requiredWithdrawPointFix = user.requiredWithdrawPointFix;

    if (record.status == "RECEIVED") {
      refetchQuestList();
    }
  } catch (e) {
    console.log("error:", e);
  }
};

refetchQuestList();
onActivated(() => {
  if (dailyQuestRecords.value.length > 0 || periodicQuestRecords.value.length > 0) {
    refetchQuestList();
  }
});
</script>
