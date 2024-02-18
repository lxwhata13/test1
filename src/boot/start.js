import { boot } from 'quasar/wrappers';
import Appsignal from '@appsignal/javascript';
import { errorHandler } from '@appsignal/vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const appsignal = new Appsignal({
    key: '4a99569a-7fb4-4b1c-88ff-d3087f77694d',
  });
  app.config.errorHandler = errorHandler(appsignal, app);
});
