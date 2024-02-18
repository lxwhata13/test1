<template>
  <ul :class="rewardClass">
    <li>{{ invited }}/{{ config?.min }}</li>
    <li>
      <q-btn
        @click="() => receiveReward(reward?.id, config?.bonus)"
        :disable="rewardClass !== 'on'"
      >
        &nbsp;
      </q-btn>
    </li>
    <li>BRL{{ config?.bonus / 100 }}</li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  config: {
    type: Object,
  },
  reward: {
    type: Object,
  },
  currentInvites: {
    type: Number,
  },
  receiveReward: {
    type: Function,
  },
});

const rewardClass = computed(() =>
  !!props.reward ? (props.reward.clearStatus === 'init' ? 'on' : 'yes') : 'off',
);

const invited = computed(() =>
  Math.min(props.config?.min, props.currentInvites),
);
</script>
