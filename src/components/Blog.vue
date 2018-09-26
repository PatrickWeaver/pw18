<template>

  <div>
    <h2>Blog</h2>
    <div v-if="activePostSlug">
      <blog-post :slug="activePostSlug"></blog-post>
    </div>
    <div v-else>
      <ul>
        <blog-post-preview v-for="(post, index) in list" :key="post.slug" :post="post" @activate-post="activatePost"></blog-post-preview>
      </ul>
    </div>
  </div>

</template>

<script>

   /* Components */
  import BlogPostPreview from './BlogPostPreview.vue'
  import BlogPost from './BlogPost.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getBlogPosts()
    },
    props: [
      'activePostSlug'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getBlogPosts'
    },
    methods: {
      async getBlogPosts() {
        if (!this.activePostSlug && this.list.length === 0) {
          var list = await(api.getData('/v1/blog/posts/'))
          this.list = list.posts_list
        }
      },
      activatePost(slug) {
        this.$router.push({ path: '/blog/' + slug })
      }
    },
    components: {
      BlogPostPreview,
      BlogPost
    }
  }

</script>
