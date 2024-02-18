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
        <li>{{ t("routes.title.BankCard") }}</li>
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
          <router-link :to="{ name: 'WithdrawBank' }" replace>
            {{ t("common.wallet") }}
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
            <span>100.00</span>
          </li>
          <li>{{ t("common.accountBalance") }}</li>
        </ul>
      </div>
      <q-form>
        <div class="Wallets_form">
          <div class="list">
            <div class="list_input">
              <p class="label text-capitalize">{{ t("profile.label.bankType") }}:</p>
              <q-input
                model-value=""
                type="text"
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              >
                <template v-slot:after>
                  <q-btn :to="{ name: 'BankCard' }" round dense flat class="icon_edit" />
                </template>
              </q-input>
            </div>

            <div class="list_input">
              <p class="label text-capitalize">
                {{ t("profile.label.bankAccountName") }}:
              </p>
              <q-input
                model-value=""
                type="text"
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input">
              <p class="label text-capitalize">{{ t("profile.label.bankAccountNo") }}:</p>
              <q-input
                model-value=""
                type="text"
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input">
              <p class="label text-capitalize">{{ t("profile.label.contactPhone") }}:</p>
              <q-input
                model-value=""
                type="text"
                dense
                :placeholder="t('withdraw.placeholder.unfilled')"
                class="Sys_input_text"
              />
            </div>

            <div class="list_input">
              <p class="label text-capitalize">{{ t("profile.label.contactEmail") }}:</p>
              <q-input
                model-value=""
                type="text"
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
                v-modelr=""
                dense
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                class="Sys_input_text"
                :placeholder="t('withdraw.placeholder.withdrawAmount')"
                lazy-rules="ondemand"
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
                <span> 10 / 100 </span>
              </li>
              <li>
                <p>
                  <i style="width: 10%"></i>
                </p>
                <span>10%</span>
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
        <div class="text">
          <p>
            Con diferentes niveles VIP, la cantidad de retiros y los impuestos también son
            diferentes
          </p>
          <p>
            Condiciones para retirar monedas: Monto efectivo de la apuesta ≥ monto del
            depósito * 2 + bono * 15 (bono por primer depósito * 20)
          </p>
          <p>Apuesta efectiva = ganancia o pérdida en el juego</p>
          <p>Ejemplo:</p>
          <p>
            Obtuviste una ganancia de 100 en el primer juego y la apuesta efectiva es 100.
          </p>
          <p>Pierdes 100 en el segundo juego y la apuesta efectiva es 100.</p>
          <p>El monto total de la apuesta válida es 200</p>
        </div>
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
