import Vue from 'vue';
import App from './App.vue';

import Icon from 'icon';
import alipayIcon from '@/icon/alipay.js';
import accountBookIcon from '@/icon/account-book.js';
import shebao from '@/icon/医疗_电子社保卡.js';
import tingzhen from '@/icon/医疗_听诊.js';
Icon.add([alipayIcon, accountBookIcon, shebao, tingzhen]);

Vue.use(Icon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
