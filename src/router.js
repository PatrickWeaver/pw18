import VueRouter from 'vue-router'

/* Pages */
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'
import BlogEditPost from './components/BlogEditPost.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Page from './components/Page.vue'
import Portfolio from './components/Portfolio.vue'
import PortfolioProject from './components/PortfolioProject.vue'
import PortfolioEditProject from './components/PortfolioEditProject.vue'
import Upload from './components/Upload.vue'

const routes = [
  {
    path: '/',
    redirect: '/about'
  },
  {
    name: 'about',
    path: '/about',
    component: Page,
    props: {
      blobSlug: 'pw-18-about',
      title: 'About'
    }
  },
  {
    name: 'blog',
    path: '/blog',
    component: Blog
  },
  {
    name: 'blog-new',
    path: '/blog/new',
    component: BlogEditPost
  },
  {
    name: 'blog-edit-post',
    path: '/blog/:activePostSlug/edit',
    component: BlogEditPost,
    props: true
  },
  {
    name: 'blog-post',
    path: '/blog/:activePostSlug',
    component: Blog,
    props: true
  },
  {
    name: 'new',
    path: '/new',
    redirect: '/now'
  },
  {
    name: 'now',
    path: '/now',
    component: Page,
    props: {
      blobSlug: 'pw-18-now',
      title: 'Now'
    }
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'portfolio-new',
    path: '/portfolio/new',
    component: PortfolioEditProject
  },
    {
    name: 'portfolio-edit-project',
    path: '/portfolio/:activeProjectSlug/edit',
    component: PortfolioEditProject,
    props: true
  },
  {
    name: 'portfolio-project-image',
    path: '/portfolio/:activeProjectSlug/:activeImageUuid',
    component: Portfolio,
    props: true
  },
  {
    name: 'portfolio-project',
    path: '/portfolio/:activeProjectSlug',
    component: Portfolio,
    props: true
  },
  {
    name: 'upload',
    path: '/upload',
    component: Upload
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'logout',
    path: '/logout',
    component: Logout
  },
  {
    name: 'custom-page',
    path: '/:blobSlug',
    component: Page,
    props: (route) =>({
      blobSlug: route.params.blobSlug,
      title: ''
    })
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
