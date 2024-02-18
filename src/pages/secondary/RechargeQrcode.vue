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
      <q-toolbar-title>
        {{ t("recharge.label.rechargeQrcode") }}
      </q-toolbar-title>
    </q-toolbar>
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

    <div class="Sys_Pcbox rechargeQrcode">
      <div class="Wallets_one">
        <p>{{ t("recharge.title.rechargeQrCode", { amount }) }}</p>
      </div>
      <div class="Wallets_qr">
        <ul @click="() => handleCopy(qrcode)">
          <li>
            {{ t("recharge.message.transferPixWallet") }}
          </li>
          <li>
            <VueQrcode
              :value="qrcode"
              :width="200"
              :quality="0.92"
              type="image/png"
              :color="{ dark: '#000000ff', light: '#ffffffff' }"
            />
          </li>

          <li class="Sys_Btn_Submit Sys_Btn_Submit_qr">
            <q-btn type="a">
              {{ t("recharge.label.copyQrcode") }}
            </q-btn>
          </li>
        </ul>
      </div>
      <div class="Wallets_tips">{{ t("recharge.label.waitFor10Minutes") }}</div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useRouter } from "vue-router";
import { useConfigStore } from "src/store/configStore";
import VueQrcode from "vue-qrcode";
import { copyText } from "src/utils";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
const { go, replace, currentRoute } = useRouter();
const configStore = useConfigStore();

const qrcode = computed(() => {
  return currentRoute.value.query.qrcode;
});

const amount = computed(() => {
  return currentRoute.value.query.amount;
});

const handleCopy = (text) => {
  copyText(text);
};
</script>

<style lang="scss" scoped></style>
