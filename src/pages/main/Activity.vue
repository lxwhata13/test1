<template>
  <q-page class="Records_page">
    <div
      class="Activity_list"
      dark
      v-for="item in configStore.carouselItems"
      :name="item.id"
      :key="item.id"
      @click="() => gotoCarouselLink(item)"
    >
      <div class="full-width">
        <!-- <q-img :src="item.image" /> -->
        <div class="pic">
          <img :src="item.image" alt="" />
        </div>
        <div class="right">
          <p>{{ item.title }}</p>
          <p>{{ $t('common.clickToSeeMore') }} >></p>
        </div>
      </div>
    </div>
    <StickyCustomerService />
    <StickyBackActivityService />
  </q-page>
</template>

<script setup>
import StickyBackActivityService from 'src/components/StickyBackActivityService.vue';
import StickyCustomerService from 'src/components/StickyCustomerService.vue';
import { useConfigStore } from 'src/store/configStore';
import { gotoCarouselLink } from 'src/utils';

const configStore = useConfigStore();
</script>

<style lang="scss" scoped></style>
