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
    <draft-label  v-if="post.draft" text="Draft" />
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
  import DraftLabel from '../DraftLabel.vue'
  
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
        var path = '/v1/blog/posts/' + this.slug
        console.log('pathh:', path)
        var apiData = await(api.getData(path, {}, this.admin))
        console.log('apiData:', apiData)
        this.post = apiData.post
        this.$emit('set-page-title', this.post.title)
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
      CoverImage,
      DraftLabel
    }
  }  

</script>


<style>
  .blog-post {
    overflow: auto;
  }
  
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
