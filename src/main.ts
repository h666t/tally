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

if (document.documentElement.clientWidth>500){
  window.alert('请使用手机以获得最佳体验')
  const QRcode = document.createElement('img')
  QRcode.src = 'https://i.loli.net/2020/09/16/5t6KkzY8GBdx1pn.png'
  document.body.appendChild(QRcode)
  QRcode.style.position='fixed'
  QRcode.style.left='50%'
  QRcode.style.top='50%'
  QRcode.style.transform='translate(-50%,-50%)'
  QRcode.style.boxShadow='0,0,10px,rgba(0,0,0,0.25)'
}



