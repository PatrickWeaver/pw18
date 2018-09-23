<template>

  <div>
    <h2>Blog</h2>
    <div v-if="activePostSlug">
      <BlogPost :slug="activePostSlug"></BlogPost>
    </div>
    <div v-else>
      <ul>
        <BlogPostPreview v-for="(post, index) in list" :post="post" @activate-post="activatePost"></BlogPostPreview>
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
        var list = await(api.getData('/v1/blog/posts/'))
        this.list = list.posts_list
      },
      activatePost(slug) {
        this.$router.push({ path: `/blog/${slug}` })
      }
    },
    components: {
      BlogPostPreview,
      BlogPost
    }
  }

</script>