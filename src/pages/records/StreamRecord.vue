<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.StreamRecords") }}</li>
      </ul>
    </div>
    <div class="Wallets_header">
      <div class="box box_three">
        <p
          v-for="listType in ['ALL', 'INCOME', 'EXPENSE']"
          :key="listType"
          :class="{ active: variables.listType === listType }"
        >
          <q-btn
            flat
            class="text-capitalize"
            @click="() => (variables.listType = listType)"
          >
            {{ t(`common.${listType.toLowerCase()}`) }}
          </q-btn>
        </p>
      </div>
    </div>
    <div class="Cash_top Cash_top_two">
      <q-input
        filled
        clearable
        v-model="variables.beginDate"
        :placeholder="t('common.beginDate')"
      >
        <template v-slot:append>
          <q-icon name="event">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              class="Sys_popup_date"
            >
              <q-date v-model="variables.beginDate" mask="YYYY-MM-DD">
                <div class="Sys_Btn_Submit">
                  <q-btn
                    v-close-popup
                    :label="t('common.continue')"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        clearable
        v-model="variables.endDate"
        @update:model-value="() => (variables.listType = 'all')"
        :placeholder="t('common.endDate')"
      >
        <template v-slot:append>
          <q-icon name="event">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              class="Sys_popup_date"
            >
              <q-date v-model="variables.endDate" mask="YYYY-MM-DD">
                <div class="Sys_Btn_Submit">
                  <q-btn
                    v-close-popup
                    :label="t('common.continue')"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="Sys_main stream_list">
      <div class="q-pa-md scroll-y hide-scrollbar">
        <q-infinite-scroll class="Record_list_ul">
          <div class="No_data" v-if="true">
            <p>&nbsp;</p>
            {{ t("common.noData") }}
          </div>

          <ul>
            <li>
              <p>Bono por Registro</p>
              <p>2023-12-15 05:26:41</p>
            </li>
            <li class="c-yellow">
              <span>+</span>
              0.1
            </li>
          </ul>
          <ul>
            <li>
              <p>Bono por Registro</p>
              <p>2023-12-15 05:26:41</p>
            </li>
            <li class="c-red">
              <span>-</span>
              1000
            </li>
          </ul>

          <template v-slot:loading>
            <div class="row justify-center q-my-md" v-if="loading">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
        <div class="Sys_q-pagination" v-if="false">
          <q-pagination
            v-model="current"
            :max="totalPages"
            @update:model-value="
              (page) => {
                fetchPage(page);
              }
            "
            input
          />
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useI18n } from "src/boot/i18n";
import { useGraphQL } from "src/graphql/hooks";
import { Query } from "src/graphql";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import { formatServerDateTime } from "src/utils";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();

const variables = reactive({
  listType: "ALL",
  paginationParams: {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
    before: -1,
  },
  beginDate: null,
  endDate: null,
});

watch(
  () => variables.listType,
  () => {
    variables.paginationParams.before = 0;
  }
);

// 分页
const current = ref(1);
</script>

<style lang="scss" scoped></style>
