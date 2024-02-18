<template>
  <div v-bind="$attrs">
    <h3
      class="text-capitalize"
      v-if="stats?.level > 0 && currentRoute.name !== 'TeamDetail'"
    >
      {{ t('common.level', { n: stats.level }) }}
    </h3>
    <ul class="top">
      <li class="text-capitalize">
        {{ t('common.members') }}: &nbsp;
        <span>{{ stats?.teamSize ?? 0 }}</span>
      </li>
      <!-- <li class="text-capitalize">
        {{ t('common.validBets') }}: &nbsp;
        <span>
          {{
            t('common.currencyAmount', { amount: stats?.totalBetAmount ?? 0 })
          }}
        </span>
      </li> -->
      <li class="three">
        <p>
          <span>
            {{
              t('common.currencyAmount', {
                amount: stats?.totalWithdrawPoint ?? 0,
              })
            }}
          </span>
          {{ t('common.validBets') }}
        </p>

        <p>
          <span>
            {{
              t('common.currencyAmount', {
                amount: stats?.totalRechargeAmount ?? 0,
              })
            }}
          </span>
          {{ t('common.recharge') }}
        </p>

        <p>
          <span>
            {{ stats?.firstRechargeUsers ?? 0 }}
          </span>
          {{ t('common.firstRecharge') }}
        </p>
      </li>

      <!-- <li
        class="more"
        v-if="stats?.level > 10 && currentRoute.name !== 'TeamDetail'"
      >
        <router-link
          :to="{ name: 'TeamDetail', params: { level: stats?.level } }"
        >
          &nbsp;
        </router-link>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'src/boot/i18n';
import { useRouter } from 'vue-router';

defineProps({
  stats: {
    type: Object,
  },
});

const { t } = useI18n();
const { currentRoute } = useRouter();
</script>
