import VueRouter from 'vue-router'

/* Pages */
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Portfolio from './components/Portfolio.vue'
import PortfolioProject from './components/PortfolioProject.vue'
import PortfolioEditProject from './components/PortfolioEditProject.vue'
import Upload from './components/Upload.vue'

const routes = [
  { path: '/blog', component: Blog },
  { path: '/blog/:activePostSlug', component: Blog, props: true },
  { path: '/portfolio', component: Portfolio },
  { path: '/portfolio/new', component: PortfolioEditProject },
  { path: '/portfolio/:activeProjectSlug', component: Portfolio, props: true },
  { path: '/portfolio/:activeProjectSlug/edit', component: PortfolioEditProject, props: true },
  { path: '/upload', component: Upload },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout }

]

export default new VueRouter({
  mode: 'history',
  routes
})
