import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './login.js'
import './ui.js'
Vue.config.productionTip = false;
const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


