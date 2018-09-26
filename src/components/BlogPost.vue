<template>

  <div id="blog-post">
    <h3>{{ post.title }}</h3>
    <h5>{{ post.post_date }}</h5>
    <p v-if="post.body" v-html="post.body.html" class="blog-post-body"></p>
  </div>

</template>

<script>
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data() {
      return {
        post: {}
      }
    },
    props: [
      'slug'
    ],
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getBlogPost()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getBlogPost'
    },
    methods: {
      async getBlogPost() {
        var api_data = await(api.getData('/v1/blog/posts/' + this.slug ))
        this.post = api_data.post
      },
      activatePost (event) {
        this.$emit('activate-post', this.post.slug)
      }
    },
    computed: {
    },
    components: {
    }
  }  

</script>
