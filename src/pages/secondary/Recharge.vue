<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        @click="() => (configStore.prevRoute ? go(-1) : replace({ name: 'UserCenter' }))"
        class="icon_left"
      />
      <q-toolbar-title>{{ $t("routes.title.Recharge") }}</q-toolbar-title>
      <q-btn :to="{ name: 'RechargeRecords' }" class="icon_right icon_1" />
    </q-toolbar>
    <PcSysHeader />
  </q-header>

  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Recharge") }}</li>
      </ul>
    </div>

    <div class="Wallets_header">
      <div class="box box_two">
        <p class="active">
          <router-link :to="{ name: 'Recharge' }" replace>
            {{ t("common.recharge") }}
          </router-link>
        </p>
        <p>
          <router-link :to="{ name: 'WithdrawBank' }" replace>
            {{ t("common.wallet") }}
          </router-link>
        </p>
        <p class="Pc">
          <router-link :to="{ name: 'RechargeRecords' }" replace>
            {{ t("routes.title.RechargeRecords") }}
          </router-link>
        </p>
      </div>
    </div>
    <div class="Sys_Pcbox Sys_Pcbox_deposit">
      <div class="Wallets_one">
        <ul>
          <li>{{ t("common.accountBalance") }}：</li>
          <li>
            <span>1000.00</span>
          </li>
        </ul>
      </div>
      <div class="Wallets_title">{{ t("recharge.label.selectAmount") }}:</div>
      <q-form>
        <div class="deposit_main">
          <div class="Wallets_radio">
            <q-radio v-model="shape" val="shape_1">
              <p>MXN 30</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_2">
              <p>MXN 35</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_3">
              <p>MXN 50</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_4">
              <p>MXN 400</p>
              <p>+ MXN 80</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_5">
              <p>MXN 500</p>
              <p>+ MXN 80</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_6">
              <p>MXN 800</p>
              <p>+ MXN 1000</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_7">
              <p>MXN 1600</p>
              <p>+ MXN 2000</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_8">
              <p>MXN 4000</p>
              <p>+ MXN 5000</p>
            </q-radio>
            <q-radio v-model="shape" val="shape_9">
              <p>MXN 8000</p>
              <p>+ MXN 10000</p>
            </q-radio>

            <q-input
              v-model.number="formModel.amount"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              dense
              :placeholder="t('recharge.placeholder.rechargeAmount')"
              class="Sys_input_text Wallets_input"
              :rules="[
                (val) => /^[0-9\.]+$/.test(val) || $t('common.invalidNumber'),
                (val) =>
                  +val >= configStore.sysConfig.minRechargeAmount / 100 ||
                  t('recharge.message.minRechargeAmount', {
                    amount: configStore.sysConfig.minRechargeAmount / 100,
                  }),
              ]"
            >
              <template v-slot:hint>
                <div class="Wallets_tips">
                  {{ t("recharge.label.extraBonus") }}:
                  <span class="text-red">
                    {{ t("common.currencyAmount", { amount: extraBonus }) }}
                  </span>
                </div>
              </template>
            </q-input>
          </div>
          <div class="Wallets_checkbox">
            <q-checkbox
              dense
              dark
              v-model="formModel.rejectRechargeBonus"
              label="No participar en la promoción"
              color="red"
            />
          </div>
        </div>

        <!--  -->
        <div class="Wallets_title">{{ t("recharge.label.payMethod") }}:</div>
        <!--  -->
        <div class="deposit_main">
          <div class="Wallets_radio Wallets_radio_two">
            <q-radio v-model="shape1" val="shape1_1">
              <p>One Pix </p>
            </q-radio>
            <q-radio v-model="shape1" val="shape1_2">
              <p>Two Pix</p>
            </q-radio>
          </div>
        </div>
        <div class="Sys_Btn_Submit Wallets_Submit">
          <q-btn type="submit">{{ t("common.continue") }}</q-btn>
        </div>
      </q-form>
      <!--  -->
      <div class="Wallets_box">
        <div class="title">
          {{ t("recharge.label.rechargeInstruction") }}
        </div>
        <div class="text">
          <p>
            1. Obtenga un bono del 80% por su primer depósito de RMB 50 o más. Cada
            persona está limitada a una oportunidad.
          </p>
          <p>
            2. Deposite ≥50 por día y reciba hasta un 20% de bonificación, una vez al día
          </p>
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { reactive, computed, toRaw, ref } from "vue";
import { useI18n } from "src/boot/i18n";
import { throttle } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from "src/store/configStore";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { Query, Mutation } from "src/graphql";

import PcSysHeader from "src/components/PcSysHeader.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
const { go, replace } = useRouter();

const userStore = useUserStore();
const configStore = useConfigStore();

const bonuses = computed(() => {
  return [];
});

const formModel = reactive({
  channelId:
    configStore.sysConfig.choosePayChannelMethod === "manual"
      ? configStore.payChannels[0].id
      : null,
  amount: null,
  rejectRechargeBonus: false,
  returnUrl: `${window.location.protocol}//${window.location.host}/`,
});

const extraBonus = computed(() => {
  return 0;
});

const { mutate: channelRecharge } = useMutation(Mutation.channelRecharge);

const handleSubmit = throttle(async () => {}, 1000);

const shape = ref();
const shape1 = ref();
</script>

<style lang="scss" scoped></style>
