import VueRouter from 'vue-router'

/* Pages */
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'
import BlogEditPost from './components/BlogEditPost.vue'
import Error404 from './components/Error404.vue'
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
      blobSlug: 'about',
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
    name: 'blog-page',
    path: '/blog/page/:pageNumber',
    component: Blog,
    props: true
  },
  {
    path: '/blog/page',
    redirect: '/blog'
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
      blobSlug: 'now',
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
    name: 'portfolio-page',
    path: '/portfolio/page/:pageNumber',
    component: Portfolio,
    props: true 
  },
  {
    path: '/portfolio/page',
    redirect: '/portfolio'
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
  },
  {
    name: '404',
    path: '/404',
    component: Error404
  }
]

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }  
})
