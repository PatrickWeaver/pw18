import VueRouter from 'vue-router'

/* Pages */
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'
import Portfolio from './components/Portfolio.vue'
import PortfolioProject from './components/PortfolioProject.vue'
import Upload from './components/Upload.vue'

const routes = [
  { path: '/blog', component: Blog },
  { path: '/blog/:activePostSlug', component: Blog, props: true },
  { path: '/portfolio', component: Portfolio },
  { path: '/portfolio/:activeProjectSlug', component: Portfolio, props: true },
  { path: '/upload', component: Upload }

]

export default new VueRouter({
  mode: 'history',
  routes
})