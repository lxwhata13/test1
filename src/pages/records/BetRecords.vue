<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.BetRecords") }}</li>
      </ul>
    </div>
    <div class="Records_one">
      <ul>
        <li>
          <q-select
            map-options
            emit-value
            :popup-content-style="{ backgroundColor: '#111F41' }"
            behavior="menu"
            v-model="variables.providerId"
            :options="providers"
          />
        </li>
        <li>
          <q-input
            filled
            dense
            v-model="variables.date"
            :placeholder="t('common.chooseDate')"
          >
            <template v-slot:append>
              <q-icon name="">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  class="Sys_popup_date"
                >
                  <q-date v-model="variables.date" mask="YYYY-MM-DD">
                    <div class="Sys_Btn_Submit">
                      <q-btn v-close-popup :label="t('common.ok')" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </li>
      </ul>
    </div>
    <div class="Records_two">
      <div class="Records_two_box">
        <!-- <div class="No_data">
          <p>&nbsp;</p>
          {{ t("common.noData") }}
        </div> -->
        <div class="Records_list">
          <ol>
            <li>{{ t("common.game") }}</li>
            <li>{{ t("common.betAmount") }}</li>
            <li>{{ t("common.winAmount") }}</li>
          </ol>
          <div class="q-pa-md scroll-y hide-scrollbar">
            <q-infinite-scroll>
              <ul>
                <li>
                  <p>Ultimate Striker</p>
                  <p>2023-12-15 05:26:41</p>
                </li>
                <li>10.00</li>
                <li class="c-yellow">
                  +5.00
                </li>
              </ul>
              <ul>
                <li>
                  <p>Ultimate Striker</p>
                  <p>2023-12-15 05:26:41</p>
                </li>
                <li>10.00</li>
                <li class="c-red">
                  -15.00
                </li>
              </ul>
            </q-infinite-scroll>
          </div>
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { ref, watch, reactive, computed } from "vue";
import { useI18n } from "src/boot/i18n";
import { useGraphQL } from "src/graphql/hooks";
import { Query } from "src/graphql";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import { formatServerDateTime } from "src/utils";
import { useConfigStore } from "src/store/configStore";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { t } = useI18n();
const configStore = useConfigStore();

const providers = computed(() => { 
  const result = Object.values(configStore?.providers).map(({ id, name }) => ({
    label: name,
    value: id,
    key: id,
  }));

  result.unshift({ label: t("common.all"), value: null, key: 0 });

  return result;
});

const { queryPage } = useGraphQL();

const variables = reactive({
  paginationParams: {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
    before: -1
  },
  providerId: null,
  date: null,
});

// 分页
const current = ref(1);
</script>

<style lang="scss" scoped></style>
