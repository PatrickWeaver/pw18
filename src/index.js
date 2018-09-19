import * as settings from '../settings'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import marked from 'marked'

import app from './components/App.vue'

import router from './router'

Vue.use(VueRouter)

Vue.filter('fromMarkdown', function (value) {
  if (!value) return ''
  return marked(value.toString())
})

const vm = new Vue({
  el: '#vm',
  router,
  components: {
    app
  },
})