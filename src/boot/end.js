import { boot } from 'quasar/wrappers';

import { dom } from 'quasar';

export default boot(async (/* { app, router, ... } */) => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    dom.css(splash, { display: 'none' });
  }, 600);
});
