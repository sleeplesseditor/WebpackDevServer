import Vue from 'vue';
import Profile from './components/profile';
import App from './app.vue';

new Vue({
  el: '#app',
  components: { Profile },
  render: h => h(App)
})