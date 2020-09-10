import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = function () {
  setTimeout(function() {
    window.scrollTo(0, 10000)
  }, 0);
}

// if (document.documentElement.clientWidth>500){
//   const QRcode = document.createElement('img')
// }



