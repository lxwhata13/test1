<template>
  <q-page class="Sys_page">
    <div class="details">
      <div class="details_name" style="display: none">{{ item.title }}</div>
      <div class="details_data" style="display: none">
        {{ $d(convertServerDateTime(item.updatedAt), 'long') }}
      </div>
      <div class="details_text" v-html="item.content"></div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useConfigStore } from 'src/store/configStore';
import { useRouter } from 'vue-router';
import { convertServerDateTime } from 'src/utils';

const { currentRoute } = useRouter();

const item = computed(() => {
  switch (currentRoute.value?.params.type) {
    case 'faq':
      const faq = configStore.faqs.find(
        (item) => item.id === +currentRoute.value?.params.id,
      );
      return faq;

    case 'carousel':
      const carousel = configStore.carouselItems.find(
        (item) => item.id === +currentRoute.value?.params.id,
      );
      return carousel;

    default:
      return { title: '', content: '', updatedAt: '' };
  }
});

const configStore = useConfigStore();
</script>

<style lang="scss" scoped></style>
