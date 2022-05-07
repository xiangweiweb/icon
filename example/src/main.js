import Vue from 'vue';
import App from './App.vue';

import Icon from '@src/icon.js';
import alipayIcon from '@/svg/colorless/alipay.js';
Icon.add(alipayIcon);

Vue.use(Icon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
