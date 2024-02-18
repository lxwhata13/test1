import { boot } from 'quasar/wrappers';

import 'assets/iconfont/iconfont.css';

import VueIconFont from 'iconfont-vue3';

export default boot(({ app }) => {
  app.use(VueIconFont);
});
