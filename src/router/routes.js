const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('pages/main/Home.vue'),
      },
      {
        path: '/promotion',
        name: 'Promotion',
        meta: {  requireConfig: true },
        component: () => import('pages/main/Promotion.vue'),
      },
      {
        path: '/rewards',
        name: 'Rewards',
        meta: {  requireConfig: true },
        component: () => import('pages/main/Rewards.vue'),
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta: {  requireConfig: true },
        component: () => import('pages/main/UserCenter.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/login/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/login/Register.vue'),
      },
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/login/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      {
        path: 'vip',
        name: 'Vip',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/Vip.vue'),
      },
      {
        path: 'deposit',
        name: 'Recharge',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/Recharge.vue'),
      },
      // {
      //   path: 'withdraw',
      //   name: 'Withdraw',
      //   meta: {  requireConfig: true },
      //   component: () => import('src/pages/secondary/Withdraw.vue'),
      // },
       {
        path: 'withdrawBank',
        name: 'WithdrawBank',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/WithdrawBank.vue'),
      },
      {
        path: 'team',
        name: 'Team',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/Team.vue'),
      },
      {
        path: 'rechargeQrcode',
        name: 'RechargeQrcode',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/RechargeQrcode.vue'),
      },
      // {
      //   path: 'teamDetail/:level',
      //   name: 'TeamDetail',
      //   meta: {  requireConfig: true },
      //   component: () => import('src/pages/secondary/TeamDetail.vue'),
      // },
      // {
      //   path: 'teamMemberDetail',
      //   name: 'TeamMemberDetail',
      //   meta: {  requireConfig: true },
      //   component: () => import('src/pages/secondary/TeamMemberDetail.vue'),
      // },
      {
        path: 'messages',
        name: 'Messages',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/SiteMessage.vue'),
      },
      {
        path: 'article/:type/:id',
        name: 'Article',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/Article.vue'),
      },
      {
        path: 'customerService',
        name: 'CustomerService',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/CustomerService.vue'),
      },
      {
        path: 'livechat/:licenseId',
        name: 'LiveChat',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/LiveChat.vue'),
      },
      {
        path: 'showGame',
        name: 'Game',
        meta: {  requireConfig: true },
        component: () => import('pages/secondary/Game.vue'),
      },
      {
        path: 'tabGames',
        name: 'TabGameList',
        meta: {  requireConfig: true },
        component: () => import('pages/secondary/TabGameList.vue'),
      },
      {
        path: 'TournamentList',
        name: 'TournamentList',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/TournamentList.vue'),
      },
      {
        path: 'tournamentDetails',
        name: 'TournamentDetails',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/TournamentDetails.vue'),
      },
      {
        path: 'promotionDetail',
        name: 'PromotionDetail',
        meta: { requireLogin: false, requireConfig: true },
        component: () => import('src/pages/secondary/PromotionDetail.vue'),
      },
      {
        path: 'backActivity',
        name: 'BackActivity',
        meta: {  requireConfig: true },
        component: () => import('src/pages/secondary/BackActivity.vue'),
      },
    ],
  },
  {
    path: '/records',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      {
        path: 'stream',
        name: 'StreamRecords',
        meta: {  requireConfig: true },
        component: () => import('src/pages/records/StreamRecord.vue'),
      },
      {
        path: 'game',
        name: 'BetRecords',
        meta: {  requireConfig: true },
        component: () => import('src/pages/records/BetRecords.vue'),
      },
      {
        path: 'deposit',
        name: 'RechargeRecords',
        meta: {  requireConfig: true },
        component: () => import('src/pages/records/RechargeRecords.vue'),
      },
      {
        path: 'withdrawal',
        name: 'WithdrawRecords',
        meta: {  requireConfig: true },
        component: () => import('src/pages/records/WithdrawRecords.vue'),
      },
    ],
  },
  {
    path: '/profile',
    component: () => import('layouts/SecondaryLayout.vue'),
    children: [
      {
        path: '',
        name: 'Settings',
        meta: {  requireConfig: true },
        component: () => import('src/pages/profile/Index.vue'),
      },
      {
        path: 'avatar',
        name: 'Avatar',
        meta: {  requireConfig: true },
        component: () => import('src/pages/profile/Avatar.vue'),
      },
      {
        path: 'password',
        name: 'Password',
        meta: {  requireConfig: true },
        component: () => import('src/pages/profile/Password.vue'),
      },
      // {
      //   path: 'fundPassword',
      //   name: 'FundPassword',
      //   meta: {  requireConfig: true },
      //   component: () => import('src/pages/profile/FundPassword.vue'),
      // },
      // {
      //   path: 'pixWallet',
      //   name: 'PixWallet',
      //   meta: {  requireConfig: true },
      //   component: () => import('src/pages/profile/PixWallet.vue'),
      // },
      {
        path: 'bankCard',
        name: 'BankCard',
        meta: {  requireConfig: true },
        component: () => import('src/pages/profile/Bankcard.vue'),
      },
    ],
  },
  // {
  //   path: '/organization',
  //   component: () => import('layouts/SecondaryLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Organization',
  //       meta: {  requireConfig: true },
  //       component: () => import('src/pages/organization/Index.vue'),
  //     },
  //     {
  //       path: 'New_about_terms',
  //       name: 'New_about_terms',
  //       meta: {  requireConfig: true },
  //       component: () => import('src/pages/organization/New_about_terms.vue'),
  //     },
  //     {
  //       path: 'New_about_privacy',
  //       name: 'New_about_privacy',
  //       meta: {  requireConfig: true },
  //       component: () => import('src/pages/organization/New_about_privacy.vue'),
  //     },
  //   ],
  // },
  {
    path: '/quest',
    component: () => import('layouts/SecondaryLayout.vue'),
     children: [
      {
        path: 'dailyQuestList',
        name: 'DailyQuestList',
        meta: {  requireConfig: true },
        component: () => import('src/pages/quest/DailyQuestList.vue'),
       },
       {
        path: 'periodicQuestList',
        name: 'PeriodicQuestList',
        meta: {  requireConfig: true },
        component: () => import('src/pages/quest/PeriodicQuestList.vue'),
      }]
  },
  {
    path: '/error_network',
    name: 'ErrorNetwork',
    meta: { requireLogin: false, requireConfig: false },
    component: () => import('pages/ErrorNetwork.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    meta: { requireLogin: false, requireConfig: false },
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
