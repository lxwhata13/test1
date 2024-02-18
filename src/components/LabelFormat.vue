<template>
  <span class="label-format">
    <sup class="text-weight-light text-italic text-deep-orange currency">
      {{ type === 'usdt' ? 'u' : CURRENCY_SYMBOL }}
    </sup>

    <strong class="text-weight-bold">
      {{ labels.yuan }}
    </strong>

    <span class="text-weight-thin cent" v-show="labels.cent !== '00'">
      .{{ labels.cent }}
    </span>
  </span>
</template>

<script setup>
import { CURRENCY_SYMBOL } from 'src/utils/constants';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'currency',
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const labels = computed(() => {
  const [yuan, cent] = (props.amount / 100.0).toFixed(2).split('.');

  return { yuan, cent };
});
</script>

<style lang="scss" scoped>
.label-format {
  letter-spacing: normal;
}
.currency {
  font-size: 0.5em;
}

.cent {
  margin-left: 1px;
  font-size: 0.5em;
}
</style>
