import * as settings from '../settings'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

import app from './components/App.vue'

import router from './router'

Vue.use(VueRouter)

const vm = new Vue({
  el: '#vm',
  router,
  components: {
    app
  },
})