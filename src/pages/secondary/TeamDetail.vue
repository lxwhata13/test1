<template>
  <q-page class="Sys_page">
    <TeamStatsBox class="team_ul team_ul_top" :stats="stats" />

    <div class="Sys_main Sys_main_level">
      <div class="q-pa-md scroll-y hide-scrollbar">
        <q-infinite-scroll class="level_list" @load="onLoad">
          <div
            class="No_data text-capitalize"
            v-if="!loading && items.length === 0"
          >
            <p>&nbsp;</p>
            {{ t('common.noData') }}
          </div>

          <ul v-for="member in items" :key="member.id">
            <li>
              <p>
                <StaticImage :url="member.avatar" />
              </p>
              <p>{{ member.name }}</p>
              <p>
                {{ t('common.regDate') }}:
                <span>{{ member.regDate }}</span>
              </p>
              <!-- <p>
                Number of Teams:
                <span>0</span>
                team bets:
                <span>0</span>
              </p> -->
            </li>
            <li class="three">
              <p class="text-capitalize">
                <span>
                  {{ member.withdrawPoint / 100 }}
                </span>
                {{ t('common.validBets') }}
              </p>
              <p class="text-capitalize">
                <span>{{ member.totalRechargeAmount / 100 }}</span>
                {{ t('common.recharge') }}
              </p>
              <p class="text-capitalize">
                <span>{{ member.firstRechargeAmount / 100 }}</span>
                {{ t('common.firstRecharge') }}
              </p>
            </li>
            <!-- <li class="more">
              <router-link to="/teamMemberDetail">&nbsp;</router-link>
            </li> -->
          </ul>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import { openURL } from 'quasar';
import { ref, watchEffect, watch, computed, reactive } from 'vue';
import { useGraphQL } from 'src/graphql/hooks';
import { Query } from 'src/graphql';
import { useI18n } from 'src/boot/i18n';
import { useUserStore } from 'src/store/userStore';
import { useRouter } from 'vue-router';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import TeamStatsBox from 'src/components/TeamStatsBox.vue';
import StaticImage from 'components/StaticImage.vue';

const { t } = useI18n();

const { currentRoute } = useRouter();

const userStore = useUserStore();

const stats = computed(() => {
  switch (currentRoute.value?.params.level) {
    case '1':
      return {
        level: 1,
        teamSize: userStore.team.level1Size,
        totalBetAmount: userStore.team.level1BetAmount,
        firstRechargeAmount: userStore.team.level1FirstRechargeAmount,
        totalRechargeAmount: userStore.team.level1RechargeAmount,
      };
    case '2':
      return {
        level: 2,
        teamSize: userStore.team.level2Size,
        totalBetAmount: userStore.team.level2BetAmount,
        firstRechargeAmount: userStore.team.level2FirstRechargeAmount,
        totalRechargeAmount: userStore.team.level2RechargeAmount,
      };
    case '3':
      return {
        level: 3,
        teamSize: userStore.team.level3Size,
        totalBetAmount: userStore.team.level3BetAmount,
        firstRechargeAmount: userStore.team.level3FirstRechargeAmount,
        totalRechargeAmount: userStore.team.level3RechargeAmount,
      };

    default:
      return null;
  }
});

const { queryPage } = useGraphQL();

const variables = reactive({
  paginationParams: {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
    before: -1
  },
  level: +currentRoute.value.params.level,
});

const { items, fetchMorePage, loading } = queryPage(
  Query.listUserTeam,
  variables,
);

const onLoad = async (_, done) => {
  await fetchMorePage();
  done();
};
</script>

<style lang="scss" scoped></style>
