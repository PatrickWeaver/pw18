import VueRouter from 'vue-router'

/* Pages */
<<<<<<< HEAD
import Blobs from './components/blobs/Blobs.vue'
import Blob from './components/blobs/Blob.vue'
import EditBlob from './components/blob/EditBlob.vue'

import Blog from './components/blog/Blog.vue'
import BlogPost from './components/blog/Post.vue'
import BlogEditPost from './components/blog/EditPost.vue'

=======
import Blog from './components/Blog.vue'
import BlogPost from './components/BlogPost.vue'
import BlogEditPost from './components/BlogEditPost.vue'
>>>>>>> master
import Error404 from './components/Error404.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Page from './components/Page.vue'
<<<<<<< HEAD

import Portfolio from './components/portfolio/Portfolio.vue'
import PortfolioProject from './components/portfolio/Project.vue'
import PortfolioEditProject from './components/portfolio/EditProject.vue'
import Tags from './components/portfolio/Tags.vue'
import PortfolioEditTag from './components/portfolio/EditTag.vue'
import PortfolioEditImage from './components/EditImage.vue'

=======
import Portfolio from './components/Portfolio.vue'
import PortfolioProject from './components/PortfolioProject.vue'
import PortfolioEditProject from './components/PortfolioEditProject.vue'
>>>>>>> master
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
<<<<<<< HEAD
      title: 'About',
      backup: 'Hi, I\'m Patrick Weaver, an artist, educator, writer, programmer, musician, and designer based in New York City, and sometimes other places. Looks like the API that powers this website is down at the moment so some information may be missing.'
    }
  },
  {
    name: 'blob-new',
    path: '/blobs/new',
    component: EditBlob
  },
  {
    name: 'blob-edit',
    path: '/blobs/:activeBlobSlug/edit',
    component: EditBlob,
    props: true
  },
  {
    name: 'blob',
    path: '/blobs/:slug',
    component: Blob,
    props: (route) =>({
      slug: route.params.slug,
      showTitle: true
    })
  },
  {
    name: 'blobs',
    path: '/blobs',
    component: Blobs
=======
      title: 'About'
    }
>>>>>>> master
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
    path: '/blog/:currentSlug/edit',
    component: BlogEditPost,
    props: true
  },
  {
    name: 'blog-post',
<<<<<<< HEAD
    path: '/blog/:slug',
=======
    path: '/blog/:activePostSlug',
>>>>>>> master
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
<<<<<<< HEAD
      title: 'Now',
      backup: 'Oops! The API is down, looks like what I should be working on is fixing it!'
    }
  },
  {
    name: 'tags',
    path: '/tags',
    component: Tags
  },
  {
    name: 'portfolio-tag-new',
    path: '/tags/new',
    component: PortfolioEditTag,
    props: (route) =>({
      new: true,
    })
  },
  {
    name: 'portfolio-edit-tag',
    path: '/tags/:currentSlug/edit',
    component: PortfolioEditTag,
    props: true
  },
  {
=======
      title: 'Now'
    }
  },
  {
>>>>>>> master
    name: 'portfolio',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'portfolio-new',
    path: '/portfolio/new',
    component: PortfolioEditProject,
    props: (route) =>({
      new: true,
    })
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
<<<<<<< HEAD
    path: '/portfolio/:currentSlug/edit',
    component: PortfolioEditProject,
    props: true
  },
  {
    name: 'portfolio-edit-project-image',
    path: '/portfolio/:projectSlug/:imageUuid/edit',
    component: PortfolioEditImage,
=======
    path: '/portfolio/:activeProjectSlug/edit',
    component: PortfolioEditProject,
>>>>>>> master
    props: true
  },
  {
    name: 'portfolio-project-image',
    path: '/portfolio/:slug/:activeImageUuid',
    component: Portfolio,
    props: true
  },
  {
    name: 'portfolio-project',
<<<<<<< HEAD
    path: '/portfolio/:slug',
=======
    path: '/portfolio/:activeProjectSlug',
>>>>>>> master
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
<<<<<<< HEAD
    name: '404',
    path: '/404',
    component: Error404
  },
  {
=======
>>>>>>> master
    name: 'custom-page',
    path: '/:blobSlug',
    component: Page,
    props: (route) =>({
      blobSlug: route.params.blobSlug,
      title: ''
    })
  },
  {
<<<<<<< HEAD
    name: '404-redirect',
    path: '*',
    redirect: '/404'
=======
    name: '404',
    path: '/404',
    component: Error404
>>>>>>> master
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
