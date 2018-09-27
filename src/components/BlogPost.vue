<template>

  <div class="blog-post">
    <a
      v-if="indexLoaded"
      href="/blog"
      @click.prevent="$emit('return-to-index')"
    >⇦ Back</a>
    <h3>{{ post.title }}</h3>
    <h5>{{ post.post_date }}</h5>
    <p v-if="post.body" v-html="post.body.html" class="blog-post-body"></p>
    <object-admin
      v-if="admin"
      @delete="deletePost"
      @edit="editPost"
    ></object-admin>
  </div>

</template>

<script>
  
  /* Helpers */
  import api from '../helpers/api'
  
  /* Components */
  import ObjectAdmin from './ObjectAdmin.vue'
  
  export default {
    data() {
      return {
        post: {}
      }
    },
    props: [
      'slug',
      'indexLoaded',
      'admin'
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
      },
      deletePost() {
        this.$emit('delete', this.post) 
      },
      editPost() {
        this.$emit('edit', this.post.slug)
      }
    },
    computed: {
    },
    components: {
      ObjectAdmin
    }
  }  

</script>


<style>


</style>
