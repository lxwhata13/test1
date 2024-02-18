import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import TimeAgo from 'vue-timeago3';
import { ptBR } from 'date-fns/locale';

export default boot(({ app }) => {
  app.use(createPinia());
  app.use(TimeAgo, { locale: ptBR });
});
