import { boot } from 'quasar/wrappers';
import { useConfigStore } from 'src/store/configStore';

export default boot(async (/* { app, router, ... } */) => {
  const configStore = useConfigStore();
  try {
    await configStore.init();
  } catch (e) {
    console.error(e);
  }
});
