<template>
  <q-page class="Sys_page">
    <div class="Detalhes_top">
      <div class="box">
        <ul>
          <li>
            <span>{{ $t('promotion.cumulativeAmount') }}</span>
          </li>
          <li>
            <span>{{ $t('promotion.numberOfPeople') }}</span>
          </li>
        </ul>
        <ol>
          <li>&gt;=20</li>
          <li>
            <b>{{ totalRecharge20 }}</b>
          </li>
        </ol>
        <ol>
          <li>&gt;=50</li>
          <li>
            <b>{{ totalRecharge50 }}</b>
          </li>
        </ol>
        <ol>
          <li>&gt;=100</li>
          <li>
            <b>{{ totalRecharge100 }}</b>
          </li>
        </ol>
        <ol>
          <li>&gt;=300</li>
          <li>
            <b>{{ totalRecharge300 }}</b>
          </li>
        </ol>
        <ol>
          <li>&gt;=500</li>
          <li>
            <b>{{ totalRecharge500 }}</b>
          </li>
        </ol>
      </div>
    </div>
    <div class="Detalhes_List">
      <ul class="title">
        <li>
          <span>{{ $t('common.name') }}</span>
        </li>
        <li>
          <span>{{ $t('common.registrationTime') }}</span>
        </li>
        <li>
          <span>{{ $t('common.firstCharge') }}</span>
        </li>
        <li>
          <span>{{ $t('common.grandTotal') }}</span>
        </li>
      </ul>

      <div class="box" v-if="total > 0">
        <ul v-for="user in items" :key="user.id">
          <li>{{ user.name }}</li>
          <li>{{ user.regDate }}</li>
          <li>{{ user.firstRechargeAmount / 100 }}</li>
          <li>{{ user.totalRechargeAmount / 100 }}</li>
        </ul>
      </div>

      <div class="No_data" v-if="!loading && total === 0">
        <p>&nbsp;</p>
        {{ $t('common.noData') }}
      </div>

      <div
        class="row justify-center"
        style="margin-top: 40px; margin-bottom: 40px"
        v-if="loading"
      >
        <q-spinner-dots color="primary" size="40px" />
      </div>

      <div class="page" v-if="max >= 1">
        <q-pagination
          v-model="variables.page"
          color="purple"
          :max="max"
          max-pages="6"
          boundary-numbers
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { Query } from 'src/graphql';

const PAGE_SIZE = 20;

const variables = reactive({
  page: 1,
  pageSize: PAGE_SIZE,
});

const { result, loading } = useQuery(Query.listTeamMembers, variables, {
  fetchPolicy: 'network-only',
});

const items = computed(() => result.value?.listTeamMembers.items ?? []);
const total = computed(() => result.value?.listTeamMembers.total ?? 0);
const totalRecharge20 = computed(
  () => result.value?.listTeamMembers.totalRecharge_20 ?? 0,
);
const totalRecharge50 = computed(
  () => result.value?.listTeamMembers.totalRecharge_50 ?? 0,
);
const totalRecharge100 = computed(
  () => result.value?.listTeamMembers.totalRecharge_100 ?? 0,
);
const totalRecharge300 = computed(
  () => result.value?.listTeamMembers.totalRecharge_300 ?? 0,
);
const totalRecharge500 = computed(
  () => result.value?.listTeamMembers.totalRecharge_500 ?? 0,
);
const max = computed(() => Math.ceil(total.value / PAGE_SIZE));
</script>
