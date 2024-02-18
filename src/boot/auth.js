import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/store/authStore';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import { joinChannel, pushEvent } from './channel';
// import { showMessageDialog } from 'src/utils';

export default boot(async ({ router }) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const configStore = useConfigStore();

  try {
    await authStore.init();

    if (!!authStore.accessToken) {
      await userStore.fetchUserInfo();
      // await userStore.listTreasurePromotionRewardSummary();
      await userStore.listGeneralPromotionDailyRewards();
      await userStore.fetchTeamCommission();
      await userStore.fetchVipRebateBonus();
      await userStore.fetchLossBenefit();
      joinChannel();
    }
  } catch (e) {
    authStore.logout();
  }

  router.beforeEach((to, from, next) => {
    if (!authStore.accessToken && to.meta.requireLogin) {
      next({ name: 'Login' });
    } else {
      if (!configStore.sysConfig && to.meta.requireConfig) {
        next({ name: 'ErrorNetwork' });
      } else {
        configStore.setPrevRoute(from);
        next();
      }
    }
  });

  router.afterEach((to, _from) => {
    pushEvent('page_viewed', { page: to.path });
  });
});
