import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { addServerMessages } from 'src/boot/i18n';
import { getOS } from 'src/utils';

import site_1 from 'assets/AppSkinD/images/Home/hezuo_01.png';
import site_2 from 'assets/AppSkinD/images/Home/hezuo_02.png';
import site_3 from 'assets/AppSkinD/images/Home/hezuo_03.png';
import site_4 from 'assets/AppSkinD/images/Home/hezuo_04.png';
import site_5 from 'assets/AppSkinD/images/Home/hezuo_05.png';
import site_6 from 'assets/AppSkinD/images/Home/hezuo_06.png';
import site_7 from 'assets/AppSkinD/images/Home/hezuo_07.png';
import site_8 from 'assets/AppSkinD/images/Home/hezuo_08.png';

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useConfigStore = defineStore('config', {
  state: () => ({
    countryCode: '52',
    carouselItems: [],
    cooperationSites: [],
    localCooperationSites: [
      { id: 1, image: site_1 },
      { id: 2, image: site_2 },
      { id: 3, image: site_3 },
      { id: 4, image: site_4 },
      { id: 5, image: site_5 },
      { id: 6, image: site_6 },
      { id: 7, image: site_7 },
      { id: 8, image: site_8 },
    ],
    sysConfig: {
      userAccountType: 'mobile',
      registerRequireIdentifyCode: false,
      downloadUrl: '/uploads/birdswin-release-v1.0.1.apk',
    },
    sysWallet: {},
    sysBankcard: {},
    siteNotices: [],
    readNotices: [],
    customerServices: [],
    specialPromotionConfig: { active: false },
    top10Players: [],
    faqs: [],
    categories: [],
    gameTabs: [],
    vipPrivileges: [],
    payChannels: [],
    providers: {},
    popularGames: [],
    games: {},
    inviteCode: null,
    prevRoute: null,
    securityNext: null,
    maxVipLevel: 10,
    platform: 'pc',
    showDownloadGuideCounter: 0,
    downloaded: false,
    tournaments: [],
    quests: [],
    treasurePromotionActivities: [],
    treasurePromotionActivityIds: [],
  }),
  // optional getters
  getters: {
    nextRouteAfterSecurityGuide() {
      if (this.securityNext) {
        return this.securityNext;
      } else {
        return { name: 'WithdrawUsdt' };
      }
    },
  },
  // optional actions
  actions: {
    async init() {
      let matches = /[?&]invite=([^&#]*)/i.exec(location.href);
      this.inviteCode = matches && matches.length == 2 ? matches[1] : null;
      this.platform = getOS();

      this.showDownloadGuideCounter =
        LocalStorage.getItem('showDownloadGuideCounter') || 0;

      this.downloaded = LocalStorage.getItem('downloaded') || false;

      await this.fetch();
      await this.fetchVipPrivileges();
      await this.fetchTop10Players();
      await this.fetchTournaments();
    },

    incShowDownloadGuideCounter() {
      this.showDownloadGuideCounter += 1;
      LocalStorage.set(
        'showDownloadGuideCounter',
        this.showDownloadGuideCounter,
      );
    },

    setDownloaded() {
      this.downloaded = true;
      LocalStorage.set('downloaded', true);
    },

    getUnreadNotice() {
      const notice = this.siteNotices.find(
        (n) => this.readNotices.indexOf(n.id) === -1,
      );

      return notice;
    },

    setNoticeRead(id) {
      this.readNotices.push(id);
    },

    setPrevRoute(prev) {
      if (prev.name !== 'ErrorNetwork') {
        this.prevRoute = prev;
      }
    },

    setSecurityNext(next) {
      this.securityNext = next;
    },

    async fetch() {
      
    },

    async fetchVipPrivileges() {
      
    },

    async fetchTop10Players() {
      
    },

    async fetchTournaments() {
      
    },
  },
});
