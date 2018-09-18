import VueRouter from 'vue-router'

/* Pages */
import Upload from './components/Upload.vue'
import Blog from './components/Blog.vue'
import Portfolio from './components/Portfolio.vue'

const routes = [
  { path: '/upload', component: Upload },
  { path: '/portfolio', component: Portfolio },
  { path: '/blog', component: Blog }
]

export default new VueRouter({
  mode: 'history',
  routes
})