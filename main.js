// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import zapSlideout from './components/SlideMenu/zapslideout'
import modal from './components/Modal/modal'

import * as VueGoogleMaps from "vue2-google-maps";
import VueFormGenerator from "vue-form-generator";

Vue.config.productionTip = false;
import auth from './auth/index'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAbn8KnOn3D6aqz4QDvviL6feEcl-Ros2g",
    libraries: "places" // necessary for places input
  }
});
Vue.component('zap-slideout', zapSlideout);

var myApp = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    myLoad() {
      auth.checkAuth();
    },
    showModal() {
      zapSlideout.isModalVisible = true;
    },
    closeModal() {
      zapSlideout.isModalVisible = false;
    }
  },


});

myApp.myLoad();
