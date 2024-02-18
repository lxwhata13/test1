<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.WithdrawRecords") }}</li>
      </ul>
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
    <div class="Records_two">
      <div class="Records_two_box">
        <!-- <div class="No_data" v-if="true">
          <p>&nbsp;</p>
          {{ t("common.noData") }}
        </div> -->
        <div class="Records_list Records_list_two">
          <q-infinite-scroll>
            <ul>
              <li>
                <p>Retirar</p>
                <p>2023-12-15 05:26:41</p>
              </li>
              <li class="c-yellow">+100</li>
              <li class="c-yellow">
                <q-chip
                  class="q-mx-none"
                  square
                  outline
                  dense
                  size="12px"
                  color="negative"
                >
                  SUCCESS
                </q-chip>
              </li>
            </ul>
            <ul>
              <li>
                <p>Retirar</p>
                <p>2023-12-15 05:26:41</p>
              </li>
              <li>+100</li>
              <li class="c-yellow">
                <q-chip
                  class="q-mx-none"
                  square
                  outline
                  dense
                  size="12px"
                  color="grey-7"
                >
                FAIL
                </q-chip>
              </li>
            </ul>
          </q-infinite-scroll>
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

const { queryPage } = useGraphQL();

const variables = reactive({
  paginationParams: {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
    before: -1,
  },
  beginDate: null,
  endDate: null,
});

// 分页
const current = ref(1);
</script>
