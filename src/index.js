import * as settings from '../settings';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import * as rp from 'request-promise-native';

import ItemList from './components/ItemList.vue'

Vue.use(VueRouter)

async function getData(path) {
  return JSON.parse(await(rp(settings.API_URL + path + '?quantity=10')))
}


Vue.component('app', {
  data: function () {
    return {}
  },
  template: `
    <div>
      <h1>Patrick Weaver</h1>
      <top-menu></top-menu>
      <router-view></router-view>
    </div>
  `
})

Vue.component('top-menu', {
  data: () => {
    return {}
  },
  template: `
  <div>
    <router-link to="/upload">Upload</router-link>
    <router-link to="/portfolio">Portfolio</router-link>
    <router-link to="/blog">Blog</router-link>
  </div>
  `
})



const Upload = {
  template: '<h2>Upload</h2>'
}


const Portfolio = {
  data: () => {
    return {
      list: []
    }
  },
  template: `
    <div>
      <h2>Portfolio</h2>
      <ItemList v-bind:list="list"></ItemList>
    </div>
  `,
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getPortfolio()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getPortfolio'
  },
  methods: {
    async getPortfolio() {
      var list = await(getData('/v1/portfolio/projects/'))
      this.list = list.projects_list
      
    }
  },
  components: {
    ItemList
  }
}

const Blog = {
  template: `
    <div>
      <h2>Blog</h2>
      <ItemList></ItemList>
    </div>
  `,
  components: {
    ItemList
  }
}

const routes = [
  { path: '/upload', component: Upload },
  { path: '/portfolio', component: Portfolio },
  { path: '/blog', component: Blog }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const vm = new Vue({
  router
}).$mount('#vm')