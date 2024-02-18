<template>
  <div class="QScrollArea">
    <P class="name">{{ treasureActivity?.title }}</P>
    <q-scroll-area style="max-width: 1000px">
      <div class="row no-wrap">
        <TreasurePromotionRewardItem
          v-for="bonusItem in treasureActivity?.config"
          :key="bonusItem.min"
          :config="bonusItem"
          :reward="reward(bonusItem.min)"
          :current-invites="rewardList?.currentInvites"
          :receive-reward="receiveReward"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import TreasurePromotionRewardItem from './TreasurePromotionRewardItem.vue';

const props = defineProps({
  treasureActivity: {
    type: Object,
  },
  rewardList: {
    type: Object,
  },
  receiveReward: {
    type: Function,
  },
});

const reward = (requiredInvites) => {
  return props.rewardList?.rewards.find(
    (item) => item.requiredInvites === requiredInvites,
  );
};
</script>
