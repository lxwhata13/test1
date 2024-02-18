<template>
  <q-page class="Trade_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.nav.promotion") }}</li>
      </ul>
    </div>

    <div class="promotion_one">
      <div class="promotion_one_box">
        <!-- <ul>
          <li>{{ t('common.bonus') }}：</li>
          <li>
            <span>{{ userStore.user.totalPromotionBonus / 100 }}</span>
          </li>
          <li class="Sys_Btn_Submit"><q-btn :to="{ name: 'Withdraw' }">{{ t('common.withdraw') }}</q-btn></li>
        </ul> -->
        <ol>
          <h3>{{ t("promotion.todayInviteData") }}</h3>
          <li>
            <span>{{ t("common.invited") }}</span>
            0
          </li>
          <li>
            <span>{{ t("common.firstRecharge") }}</span>
            0
          </li>
          <li>
            <span>
              {{ t("promotion.inviteRewards") }} ({{ t("common.estimated") }})
            </span>
            MXN 0
          </li>
          <li>
            <span> {{ t("common.commission") }} ({{ t("common.estimated") }}) </span>
            MXN 0
          </li>
        </ol>
      </div>
    </div>
    <div class="promotion_two">
      <ul>
        <li>
          <q-btn @click="showInviteDialog = true">
            {{ t("promotion.shareYourLink") }}
          </q-btn>
        </li>
        <li>
          <q-btn :to="{ name: 'Team' }">{{ t("common.detail") }}</q-btn>
        </li>
      </ul>
    </div>

    <div class="promotion_three">
      <div class="promotion_three_box">
        <div class="promotion_title">{{ t("home.title.illustration") }}</div>
        <div class="promotion_text">
          <img src="~assets/AppSkinD/upload/Text_01.png" alt="" />
        </div>
        <div class="promotion_text">
          <p>
            Puede compartir su enlace de invitación en plataformas de software social y
            los miembros que se registren a través de su enlace se convertirán en sus
            subordinados directos.
          </p>
          <p>
            Cuando sus miembros afiliados recarguen en la plataforma y realicen apuestas
            con éxito, recibirá recompensas de comisiones.
          </p>
          <p>Tu comisión = comisión nivel 1 + comisión nivel 2 + comisión nivel 3</p>
          <p>
            Comisión de nivel 1 = 0,6% del volumen de apuestas de los usuarios de nivel 1
          </p>
          <p>
            Comisión de nivel 2 = 0,5% del importe de la apuesta de los usuarios de nivel
            2
          </p>
          <p>
            Comisión de nivel 3 = 0,1% del volumen de apuestas de los usuarios de nivel 3
          </p>
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
    <StickyBackActivityService />

    <q-dialog v-model="showInviteDialog" class="Sys_dialog">
      <q-card class="Sys_dialog_promotion">
        <q-btn flat round dense v-close-popup color="close" />
        <q-card-section class="scroll">
          <div class="promotion">
            <ul>
              <li>
                <p><b></b></p>
                <p>1 {{ t("promotion.shareLink") }}</p>
              </li>
              <li>
                <p><b></b></p>
                <p>2 {{ t("common.registration") }}</p>
              </li>
              <li>
                <p><b></b></p>
                <p>3 {{ t("promotion.earnRewards") }}</p>
              </li>
            </ul>
            <ol>
              <li>{{ t("promotion.referralLink") }}</li>
              <li>
                <p>{{ inviteUrl }}</p>
                <q-btn @click="() => copyText(inviteUrl)">Copy</q-btn>
              </li>
              <li>{{ t("promotion.referralCode") }}</li>
              <li>
                <p>6MMMTK</p>
                <q-btn @click="() => copyText(inviteUrl)">Copy</q-btn>
              </li>
              <li>{{ t("promotion.qrCode") }}</li>
              <li>
                <VueQrcode
                  :value="inviteUrl"
                  :width="200"
                  :quality="0.92"
                  type="image/png"
                  :color="{ dark: '#000000ff', light: '#ffffffff' }"
                />
              </li>
            </ol>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "Promotion",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { ref, computed, onActivated } from "vue";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
// import { useConfigStore } from 'src/store/configStore';
import VueQrcode from "vue-qrcode";
import { copyText } from "src/utils";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";
import { LocalStorage, throttle, useQuasar } from "quasar";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { Query, Mutation } from "src/graphql";
import StickyBackActivityService from "src/components/StickyBackActivityService.vue";

const userStore = useUserStore();
// const configStore = useConfigStore();
// const $q = useQuasar();

const { t } = useI18n();

const savedInviteCode = LocalStorage.getItem("inviteCode");

const inviteUrl = `${window.origin || window.location.origin}/?invite=${
  userStore.user.inviteCode || savedInviteCode
}`;

const tab = ref("promotion");
// const { result, refetch, loading } = useQuery(
//   Query.listSpecialPromotionRewards,
//   {},
// );

// const totalInvitedUsers = computed(
//   () => result.value?.listSpecialPromotionRewards?.totalInvitedUsers ?? 0,
// );

// const rewards = computed(
//   () => result.value?.listSpecialPromotionRewards?.rewards ?? [],
// );

// const rewardStatus = (invitedUsers) => {
//   const reward = rewards.value?.find(
//     (item) => item.invitedUsers == invitedUsers,
//   );

//   return reward?.clearStatus;
// };

const inviteData = computed(() => []);

const showInviteDialog = ref(false);
</script>
