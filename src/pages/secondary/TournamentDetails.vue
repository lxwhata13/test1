<template>
  <q-page class="Sys_page Sys_page_CompDetails">

    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.TournamentDetails") }}</li>
      </ul>
    </div>

    <div class="CompDetails_one">
      <p>Valor cumulativo da recompensa, valor fixo desembolsado diretamente</p>
      <p>2140</p>
    </div>
    <div class="CompDetails_two">Cuenta regresiva: 3 dias</div>

     <div class="CompDetails_three">
      <ul>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt47</li>
      </ul>
      <ul>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt50</li>
      </ul>
      <ul>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt53</li>
      </ul>
    </div>

    <div class="CompDetails_list">
      <ul>
        <li>4</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt54</li>
      </ul>
      <ul>
        <li>5</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt55</li>
      </ul>
      <ul>
        <li>6</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt56</li>
      </ul>
      <ul>
        <li>7</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt57</li>
      </ul>
      <ul>
        <li>8</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt58</li>
      </ul>
      <ul>
        <li>9</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt59</li>
      </ul>
      
      <ul>
        <li>10</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt60</li>
      </ul>
      
      <ul>
        <li>11</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt61</li>
      </ul>
      
      <ul>
        <li>12</li>
        <li>
          <span>
            <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
          </span>
        </li>
        <li>
          <span>0</span>
        </li>
        <li>tt62</li>
      </ul>
    </div>
    <!-- 浮动 -->

    <q-page-sticky position="bottom-right" :offset="[0, 0]" class="Sys_bottom_sticky">
      <q-btn @click="showInviteDialog = true" class="q-btn-Comp">&nbsp;</q-btn>
      <q-btn v-if="!hasCustomerLink" to="/CustomerService" class="q-btn-Comp">
        &nbsp;
      </q-btn>
      <q-btn v-if="hasCustomerLink" @click="onClickCustomerService()" class="q-btn-Comp">
        &nbsp;
      </q-btn>
    </q-page-sticky>
    <!-- 弹窗，竞赛规则 -->
    <!-- <q-dialog v-model="showInviteDialog" persistent class="Sys_dialog">
      <q-card>
        <q-card-section class="Sys_dialog_title">
          <div class="name">{{ tournament.title }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="scroll">
          <div v-html="tournament.description"></div>
        </q-card-section>
      </q-card>
    </q-dialog> -->
    <PcCopyright />
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { ref, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useConfigStore } from "src/store/configStore";
import { useRouter } from "vue-router";
import Countdown from "src/components/Countdown.vue";
import StaticImage from "components/StaticImage.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
const configStore = useConfigStore();
const showInviteDialog = ref(false);




</script>
