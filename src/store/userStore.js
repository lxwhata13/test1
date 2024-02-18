import { defineStore } from 'pinia';
import { apolloClient } from 'src/apolloClient';
import { Query } from 'src/graphql';
import { LocalStorage } from 'quasar';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    team: {},
    bankcard: {},
    pixWallet: {},
    wallet: {},
    customerServices: [],
    unreadMessageCount: 0,
    vipBonusStatuses: {},
    signupDays: 0,
    alreadySignupToday: false,
    favoriteGames: [],
    recentGames: [],
    treasurePromotionRewardSummary: [],
    generalPromotionRewards: [],
    teamCommission: [],
    vipRebateBonus: [],
    lossBenefit: { id: 0, amount: 0 },
    alreadyShowBackActivity: false,
  }),
  // optional getters
  getters: {
    commission: (state) =>
      state.team?.level1Commission +
      state.team?.level2Commission +
      state.team?.level3Commission,
  },
  // optional actions
  actions: {
    async fetchUserInfo() {
      // reset current user data
      this.logout();

      let {
        data: {
          getUserInfo: {
            id,
            name,
            email,
            countryCode,
            mobile,
            avatar,
            vipLevel,
            inviteCode,
            balance,
            withdrawPoint,
            effectiveWithdrawPoint,
            requiredWithdrawPoint,
            requiredWithdrawPointFix,
            totalRechargeAmount,
            totalRechargeOrders,
            totalApplyWithdrawAmount,
            totalApplyWithdrawOrders,
            totalSuccessWithdrawAmount,
            totalSuccessWithdrawOrders,
            vipBonusStatuses,
            signupDays,
            alreadySignupToday,
            team,
            bankcard,
            customerServices,
            unreadMessageCount,
            totalPromotionBonus,
            totalCommission,
            backActivityBuff,
            backActivityRedPacketStatus,
          },
        },
      } = await apolloClient.query({
        query: Query.getUserInfo,
        fetchPolicy: 'network-only',
      });

      if (inviteCode) {
        localStorage.setItem('inviteCode', inviteCode);
      }

      this.$patch({
        user: {
          id,
          name,
          email,
          countryCode,
          mobile,
          avatar,
          vipLevel,
          inviteCode,
          balance,
          withdrawPoint,
          effectiveWithdrawPoint,
          requiredWithdrawPoint,
          requiredWithdrawPointFix,
          totalRechargeAmount,
          totalRechargeOrders,
          totalApplyWithdrawAmount,
          totalApplyWithdrawOrders,
          totalSuccessWithdrawAmount,
          totalSuccessWithdrawOrders,
          totalPromotionBonus,
          totalCommission,
          backActivityBuff,
          backActivityRedPacketStatus,
        },
        team: team,
        bankcard: bankcard || {},
        customerServices: customerServices || [],
        unreadMessageCount,
        vipBonusStatuses,
        signupDays,
        alreadySignupToday,
      });

      this.loadFavoriteGames();
      this.loadRecentGames();
    },

    async updateUserInfo() {
      let {
        data: {
          getUserInfo: {
            id,
            vipLevel,
            balance,
            unreadMessageCount,
            signupDays,
            alreadySignupToday,
            withdrawPoint,
            effectiveWithdrawPoint,
            requiredWithdrawPoint,
            requiredWithdrawPointFix,
            totalRechargeAmount,
            totalRechargeOrders,
            totalApplyWithdrawAmount,
            totalApplyWithdrawOrders,
            totalSuccessWithdrawAmount,
            totalSuccessWithdrawOrders,
            totalPromotionBonus,
            totalCommission,
            team,
            backActivityBuff,
            backActivityRedPacketStatus,
          },
        },
      } = await apolloClient.query({
        query: Query.refreshUserInfo,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        user: {
          id,
          vipLevel,
          balance,
          withdrawPoint,
          effectiveWithdrawPoint,
          requiredWithdrawPoint,
          requiredWithdrawPointFix,
          totalRechargeAmount,
          totalRechargeOrders,
          totalApplyWithdrawAmount,
          totalApplyWithdrawOrders,
          totalSuccessWithdrawAmount,
          totalSuccessWithdrawOrders,
          totalPromotionBonus,
          totalCommission,
          backActivityBuff,
          backActivityRedPacketStatus,
        },
        team: team,
        unreadMessageCount,
        signupDays,
        alreadySignupToday,
      });
    },

    async listTreasurePromotionRewardSummary() {
      let {
        data: { listTreasurePromotionRewardSummary },
      } = await apolloClient.query({
        query: Query.listTreasurePromotionRewardSummary,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        treasurePromotionRewardSummary: listTreasurePromotionRewardSummary,
      });
    },

    async listGeneralPromotionDailyRewards() {
      let {
        data: { listGeneralPromotionDailyRewards },
      } = await apolloClient.query({
        query: Query.listGeneralPromotionDailyRewards,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        generalPromotionRewards: listGeneralPromotionDailyRewards,
      });
    },

    async fetchTeamCommission() {
      let {
        data: { fetchTeamCommission },
      } = await apolloClient.query({
        query: Query.fetchTeamCommission,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        teamCommission: fetchTeamCommission,
      });
    },

    async fetchVipRebateBonus() {
      let {
        data: { fetchVipRebateBonus },
      } = await apolloClient.query({
        query: Query.fetchVipRebateBonus,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        vipRebateBonus: fetchVipRebateBonus,
      });
    },

    async fetchLossBenefit() {
      let {
        data: { fetchLossBenefit },
      } = await apolloClient.query({
        query: Query.fetchLossBenefit,
        fetchPolicy: 'network-only',
      });

      this.$patch({
        lossBenefit: fetchLossBenefit,
      });
    },

    setUser(user) {
      this.$patch({ user });
    },

    setTeam(team) {
      this.$patch({ team });
    },

    setBankcard(bankcard) {
      this.bankcard = bankcard;
    },

    setWallet(wallet) {
      this.wallet = wallet;
    },

    setPixWallet(pixWallet) {
      this.pixWallet = pixWallet;
    },

    setUnreadMessageCount(unreadMessageCount) {
      this.unreadMessageCount = unreadMessageCount;
    },

    updateSignupDays({ signupDays, alreadySignupToday, balance }) {
      this.alreadySignupToday = alreadySignupToday;
      this.signupDays = signupDays;
      this.balance = balance;
    },

    setAlreadyShowBackActivity(alreadyShowBackActivity) {
      this.alreadyShowBackActivity = alreadyShowBackActivity;
    },

    setVipBonusStatuses(vipBonusStatuses) {
      this.vipBonusStatuses = vipBonusStatuses;
    },

    updateBalance(balance) {
      this.user.balance = balance;
    },

    updateAvatar(avatar) {
      this.user.avatar = avatar;
    },

    loadRecentGames() {
      const recentGamesJson =
        LocalStorage.getItem(`recentGames:${this.user.id}`) || '[]';
      const recentGames = JSON.parse(recentGamesJson);
      this.recentGames = recentGames;
    },

    addToRecent(game) {
      const index = this.recentGames.findIndex(
        (element) => element.id === game.id,
      );

      const recentGames = this.recentGames.slice();

      if (index >= 0) {
        recentGames.splice(index, 1);
      }

      recentGames.unshift(game);
      this.recentGames = recentGames;

      const json = JSON.stringify(this.recentGames);
      LocalStorage.set(`recentGames:${this.user.id}`, json);
    },

    loadFavoriteGames() {
      const favoriteGamesJson =
        LocalStorage.getItem(`favoriteGames:${this.user.id}`) || '[]';
      const favoriteGames = JSON.parse(favoriteGamesJson);
      this.favoriteGames = favoriteGames;
    },

    addToFavorite(game) {
      const index = this.favoriteGames.findIndex(
        (element) => element.id === game.id,
      );

      const favoriteGames = this.favoriteGames.slice();

      if (index >= 0) {
        favoriteGames.splice(index, 1);
      }

      favoriteGames.unshift(game);

      this.favoriteGames = favoriteGames;

      const json = JSON.stringify(this.favoriteGames);

      LocalStorage.set(`favoriteGames:${this.user.id}`, json);
    },

    removeFromFavorite(game) {
      const index = this.favoriteGames.findIndex(
        (element) => element.id === game.id,
      );

      if (index >= 0) {
        const favoriteGames = this.favoriteGames.slice();
        favoriteGames.splice(index, 1);

        this.favoriteGames = favoriteGames;

        const json = JSON.stringify(this.favoriteGames);
        LocalStorage.set(`favoriteGames:${this.user.id}`, json);
      }
    },

    logout() {
      this.user = {};
      this.team = {};
      this.data = {};
      this.bankcard = {};
      this.wallet = {};
      this.pixWallet = {};
      this.customerServices = [];
      this.unreadMessageCount = 0;
      this.favoriteGames = [];
      this.recentGames = [];
    },
  },
});
