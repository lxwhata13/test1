<template>
  <q-card class="card-user-assets q-mx-md q-mb-md q-pa-none column">
    <q-card-section class="q-pa-md row flex-center">
      <div class="col col-6 text-center">
        <p class="text-subtitle1">{{ t('common.myAssets') }}</p>
        <p class="text-subtitle2">
          <LabelFormat :amount="userStore.user.balance" type="usdt" />
        </p>
      </div>

      <div class="col col-6 text-center">
        <p class="text-subtitle1">{{ t('common.virtualAssets') }}</p>
        <p class="text-subtitle2">
          <LabelFormat :amount="userStore.user.virtualBalance" type="usdt" />
        </p>
      </div>
    </q-card-section>

    <q-separator
      v-if="currentRoute.name === 'Home'"
      class="q-separator-primary"
    />

    <q-card-actions
      class="row justify-evenly align-center"
      :class="currentRoute.name === 'Home' ? 'q-py-md' : 'q-py-xs'"
    >
      <div class="column flex-center">
        <p class="text-subtitle3">{{ t('common.miningRevenue') }}</p>
        <p class="text-subtitle4">
          <LabelFormat :amount="userStore.user.totalIncome" type="usdt" />
        </p>
      </div>

      <q-separator class="q-separator-dotted" vertical inset />

      <div class="column flex-center">
        <p class="text-subtitle3">{{ t('common.minerRewards') }}</p>
        <p class="text-subtitle4">
          <LabelFormat :amount="userStore.commission" type="usdt" />
        </p>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'src/boot/i18n';
import LabelFormat from './LabelFormat.vue';
import { useUserStore } from 'src/store/userStore';

const { currentRoute } = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.card-user-assets {
  // width: 100vw;
  background: linear-gradient(
    to bottom,
    rgba(107, 142, 229, 0.8),
    rgba(50, 70, 199, 0.8)
  );
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 30%);
  z-index: 2;

  .text-subtitle1,
  .text-subtitle2,
  .text-subtitle3,
  .text-subtitle4 {
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    font-variant: tabular-nums;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: tabular-nums;
    font-variant-east-asian: normal;
    letter-spacing: normal;
  }

  .text-subtitle1 {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .text-subtitle2 {
    font-size: 30px;
    margin-bottom: 0px;
  }
  .text-subtitle3 {
    font-size: 11px;
    margin-bottom: 0px;
  }

  .text-subtitle4 {
    font-size: 16px;
    margin-bottom: 0px;
  }
}
</style>
