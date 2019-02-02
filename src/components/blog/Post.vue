<template>

  <div class="blog-post">
    <a
      v-if="indexLoaded"
      href="/blog"
      @click.prevent="$emit('return-to-index')"
    >⇦ Back</a>
    <h3 class="post-title">
      <a :href="'/blog/' + post.slug" @click.prevent="" >
        {{ post.title }}
      </a>
    </h3>
    <h4 v-if="post.draft">
      Draft  
    </h4>
    <cover-image
      :url="post.cover_image_url"
      :alt="post.cover_image_alt_text"
    />
    <h5 class="post-date"><readable-date :date="post.post_date"></readable-date></h5>
    <div v-if="post.summary" v-html="post.summary.html" class="blog-post-summary text"></div>
    <div v-if="post.body" v-html="post.body.html" class="blog-post-body text"></div>
    <object-admin
      v-if="admin"
      @delete="deletePost"
      @edit="editPost"
    ></object-admin>
  </div>

</template>

<script>
  
  /* Helpers */
  import api from '../../helpers/api'
  
  /* Components */
  import ObjectAdmin from '../ObjectAdmin.vue'
  import ReadableDate from '../ReadableDate.vue'
  import CoverImage from './CoverImage.vue'
  
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
        var api_data = await(api.getData('/v1/blog/posts/' + this.slug, {}, this.admin))
        this.post = api_data.post
      },
      activatePost (event) {
        this.$emit('activate-post', this.post.slug)
      },
      deletePost() {
        this.$emit('delete', this.post.slug) 
      },
      editPost() {
        this.$emit('edit', this.post.slug)
      }
    },
    computed: {
    },
    components: {
      ObjectAdmin,
      ReadableDate,
      CoverImage
    }
  }  

</script>


<style>
  .blog-post-summary {
    background-color: white;
    margin-bottom: 2em;
    padding: .5em 1em;
  }
  
  .blog-post-summary p {
    margin: .5em 0; 
  }
  
  .blog-post-body {
    font-family: serif; 
  }

</style>
