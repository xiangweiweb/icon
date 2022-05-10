import Vue from 'vue';
import App from './App.vue';

import Icon from '@src/icon.js';
import alipayIcon from '@/svg/colorless/alipay.js';
import accountBookIcon from '@/svg/colorless/account-book.js';
import doHesuan from '@/svg/colorful/下楼做核酸.js';
Icon.add([alipayIcon, doHesuan, accountBookIcon]);

Vue.use(Icon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
