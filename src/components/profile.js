import Vue from 'vue';

export default Vue.component('Profile', {
  data: () => ({ 
    name: 'Hyrule'
  }),
  template: `
  <div class="profile">
    <img src="./images/link.jpg" alt="">
    <h1>Hello {{name}}</h1>
  </div>
  `
})