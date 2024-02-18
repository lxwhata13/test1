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
      <q-toolbar-title>{{ $t("routes.title.Withdraw") }}</q-toolbar-title>
      <q-btn :to="{ name: 'WithdrawRecords' }" class="icon_right icon_1" />
    </q-toolbar>
    <PcSysHeader />
  </q-header>

  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Withdraw") }}</li>
      </ul>
    </div>
    <div class="Wallets_header">
      <div class="box box_two">
        <p>
          <router-link :to="{ name: 'Recharge' }" replace>
            {{ t("common.recharge") }}
          </router-link>
        </p>
        <p class="active">
          <router-link :to="{ name: 'Withdraw' }" replace>
            {{ t("common.withdraw") }}
          </router-link>
        </p>
        <p class="Pc">
          <router-link :to="{ name: 'WithdrawRecords' }" replace>
            {{ t("routes.title.WithdrawRecords") }}
          </router-link>
        </p>
      </div>
    </div>

    <div class="Sys_Pcbox Sys_Pcbox_Wallets">
      <div class="Wallets_one">
        <ul>
          <li>
            <span>{{ 0 }}</span>
          </li>
          <li>{{ t("common.accountBalance") }}</li>
        </ul>
      </div>
      <q-form @submit="handleSubmit">
        <div class="Wallets_form">
          <div class="list">
            <div class="list_input">
              <p class="label text-capitalize">{{ t("profile.label.pixAcctType") }}:</p>
              <q-input
                :model-value="userStore.pixWallet.acctType"
                type="text"
                dense
                readonly
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              >
                <template v-slot:after v-if="!hideEditButton">
                  <q-btn :to="{ name: 'PixWallet' }" round dense flat class="icon_edit" />
                </template>
              </q-input>
            </div>

            <div class="list_input" v-if="configStore.sysConfig.showBankcardAcctName">
              <p class="label text-capitalize">{{ t("profile.label.pixAcctName") }}:</p>
              <q-input
                :model-value="userStore.pixWallet.acctName"
                type="text"
                readonly
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input" v-if="configStore.sysConfig.showBankcardAcctNo">
              <p class="label text-capitalize">{{ t("profile.label.pixAcctNo") }}:</p>
              <q-input
                :model-value="userStore.pixWallet.acctNo"
                type="text"
                readonly
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input" v-if="configStore.sysConfig.showBankcardMobile">
              <p class="label text-capitalize">{{ t("profile.label.contactPhone") }}:</p>
              <q-input
                :model-value="userStore.pixWallet.contactPhone"
                type="text"
                readonly
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input" v-if="configStore.sysConfig.showBankcardEmail">
              <p class="label text-capitalize">{{ t("profile.label.contactEmail") }}:</p>
              <q-input
                :model-value="userStore.pixWallet.contactEmail"
                type="text"
                readonly
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input">
              <p class="label text-capitalize">
                {{ t("withdraw.label.amountToWithdraw") }}:
              </p>
              <q-input
                v-model.number="formModel.amount"
                dense
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                class="Sys_input_text"
                :placeholder="t('withdraw.placeholder.withdrawAmount')"
                lazy-rules="ondemand"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    t('message.required', {
                      fieldName: t('withdraw.label.amount'),
                    }),
                  (val) =>
                    val >= 0 ||
                    t('withdraw.message.minAmount', {
                      amount: 0,
                    }),
                  (val) =>
                    val <= 1000 ||
                    t('withdraw.message.notEnoughBalance'),
                  (val) =>
                    val <= maxWithdrawalAmount ||
                    t('withdraw.message.maxAmount', {
                      amount: maxWithdrawalAmount,
                    }),
                ]"
              >
                <template v-slot:hint>
                  <div v-show="formModel.amount > 0" class="q-pl-md text-grey">
                    {{ configStore.sysConfig.withdrawTaxName }}:
                    <span class="text-red">
                      {{ CURRENCY_NAME }} {{ taxAmount.toFixed(2) }}
                    </span>
                  </div>
                </template>
              </q-input>
            </div>

            <ul>
              <li>
                {{ $t("withdraw.label.unlockWithdraw") }}：
                <span v-if="configStore.sysConfig.showWithdrawPoint">
                  {{
                    (userStore.user.effectiveWithdrawPoint +
                      userStore.user.requiredWithdrawPointFix) /
                    100
                  }}
                  /
                  {{ userStore.user.requiredWithdrawPoint / 100 }}
                </span>
              </li>
              <li>
                <p>
                  <i :style="`width: ${withdrawPercentage}%`"></i>
                </p>
                <span>{{ withdrawPercentage.toFixed(2) }}%</span>
              </li>
            </ul>
          </div>
          <div class="Sys_Btn_Submit Wallets_Submit">
            <q-btn type="submit" @loading="submitting">
              {{ t("common.continue") }}
            </q-btn>
          </div>
        </div>
      </q-form>
      <div class="Wallets_box q-ma-md q-pa-md">
        <div class="title">
          {{ t("withdraw.label.withdrawInstruction") }}
        </div>
        <div class="text" v-html="t('server.withdrawIntroduction')"></div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { computed, reactive, onMounted, onActivated } from "vue";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from "src/store/configStore";
import { CURRENCY_NAME } from "src/utils/constants";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { Mutation } from "src/graphql";
import { throttle, useQuasar } from "quasar";
import { downloadApp } from "src/utils";
import { useQuery } from "@vue/apollo-composable";
import { Query } from "src/graphql";
import PcSysHeader from "src/components/PcSysHeader.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const userStore = useUserStore();
const configStore = useConfigStore();
const { replace, go } = useRouter();
const { t } = useI18n();
const $q = useQuasar();

const formModel = reactive({
  amount: null,
});




</script>
