<template>
  <q-dialog v-model="visible">
    <q-card class="full-width bg-white">
      <q-card-section class="row items-center q-pa-sm">
        <div class="text-h6 text-center col-11">{{ title }}</div>
        <q-btn flat round dense v-close-popup class="col-1">
          <icon name="guanbi" type="class" class="self-start text-grey-5" />
        </q-btn>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ content }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
});

const visible = ref(false);

function show() {
  visible.value = true;
}
</script>
