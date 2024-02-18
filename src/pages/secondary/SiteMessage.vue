<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        @click="() => (configStore.prevRoute ? go(-1) : replace({ name: 'UserCenter' }))"
        class="icon_left"
      />
      <q-toolbar-title>{{ $t("routes.title.Messages") }}</q-toolbar-title>
    </q-toolbar>
    <PcSysHeader @OnReadAllMessages="() => readAllMessages()" />
  </q-header>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Withdraw") }}</li>
      </ul>
    </div>
    <div class="mess scroll-y hide-scrollbar">
      <q-infinite-scroll class="mess_box">
        <div class="No_data text-capitalize" v-if="true">
          <p>&nbsp;</p>
          {{ t("common.noData") }}
        </div>

        <div
          class="mess_ul"
          @click="() => readMessage(item)"
          :class="{ active: !item.read }"
          v-for="item in items"
          :key="item.id"
        >
          <ul>
            <li class="name">
              {{ $t("siteMessage.title", item.params) }}
            </li>

            <li class="time">
              <timeago :datetime="convertServerDateTime(item.insertedAt)" />
            </li>

            <li class="text">
              {{ t("siteMessage.content", item.params) }}
            </li>
          </ul>
        </div>
      </q-infinite-scroll>
      <div class="Sys_q-pagination"  v-if="false">
        <q-pagination v-model="current" :max="totalPages" @update:model-value="(page)=>{fetchPage(page)}" input />
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useQuasar, throttle } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/store/userStore";
import { Mutation, Query } from "src/graphql";
import { useI18n } from "src/boot/i18n";
import { convertServerDateTime } from "src/utils";
import { useGraphQL } from "src/graphql/hooks";
import { useMutation } from "@vue/apollo-composable";
import { useConfigStore } from "src/store/configStore";

import PcSysHeader from "src/components/PcSysHeader.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const { t, d } = useI18n();
const $q = useQuasar();
const { queryPage } = useGraphQL();
const { go, replace } = useRouter();

const configStore = useConfigStore();

// 分页
const current = ref(1);     


</script>

<style lang="scss" scoped></style>
