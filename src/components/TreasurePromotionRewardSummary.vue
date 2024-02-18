<template>
  <div class="Award_list">
    <ul>
      <h3>{{ treasureActivity?.title }}</h3>
      <li>
        <p>&nbsp;</p>
        <p>Número de pessoas</p>
        <p>bônus</p>
      </li>
      <li>
        <p>{{ $t('promotion.effectiveInvites') }}</p>
        <p>{{ rewardSummary?.effectiveInvites }}</p>
        <p>
          <b>{{ rewardSummary?.totalReward / 100 }}</b>
          R$
        </p>
      </li>
      <li>
        <p>{{ $t('promotion.claimedInvites') }}</p>
        <p>{{ rewardSummary?.claimedInvites }}</p>
        <p>
          <b>{{ rewardSummary?.claimedReward / 100 }}</b>
          R$
        </p>
      </li>
      <li>
        <p>{{ $t('promotion.availableInvites') }}</p>
        <p>{{ rewardSummary?.availableInvites }}</p>
        <p>
          <b>{{ rewardSummary?.availableReward / 100 }}</b>
          R$
        </p>
      </li>
      <li>
        <p>{{ $t('promotion.unavailableInvites') }}</p>
        <p>{{ rewardSummary?.unavailableInvites }}</p>
        <p>
          <b>{{ rewardSummary?.unavailableReward / 100 }}</b>
          R$
        </p>
      </li>
      <li class="Operar">
        <q-btn
          @click="() => receiveReward(treasureActivity?.id)"
          :disable="rewardSummary?.availableInvites === 0"
        >
          {{ $t('common.receive') }}
        </q-btn>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  treasureActivity: {
    type: Object,
  },
  rewardSummary: {
    type: Object,
  },
  receiveReward: {
    type: Function,
  },
});
</script>
