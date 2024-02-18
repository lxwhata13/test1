<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.TournamentList") }}</li>
      </ul>
    </div>
    <div class="Sys_Pcbox">
      <div class="Comp_list">
        <div class="CompImg">
          <router-link to="tournamentDetails">
            <div class="CompImg_pic"><q-img src="~assets/AppSkinD/upload/TournamentList.png" alt="" /></div>
            <ul>
              <h3>Valor cumulativo da recompensa, valor fixo desembolsado diretamente</h3>
              <li>Cuenta regresiva: 3 dias</li>
            </ul>
          </router-link>
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useConfigStore } from "src/store/configStore";
import Countdown from "src/components/Countdown.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const configStore = useConfigStore();
const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
