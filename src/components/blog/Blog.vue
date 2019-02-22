<template>

  <div>
    <h2 class="page-title">Blog</h2>
    <!-- if viewing single blog post -->
    <div v-if="slug">
      <post
        :index-loaded="indexLoaded"
        :slug="slug"
        :admin="admin"
        @return-to-index="returnToIndex"
        @edit="editPost"
        @delete="deletePost"
        @set-page-title="passTitleUp"
      />
    </div>
    
    <!-- Else list of blog posts -->
    <div v-else>
      <!-- List of post previews -->
      <index 
        :admin="admin"
        :page-number="pageNumber"
        :edit-post="editPost"
        :delete-post="deletePost"
        @index-load="indexLoad"
      />
    </div>
    
  </div>

</template>

<script>

   /* Components */
  import Index from './Index.vue'
  import Post from './Post.vue'

  /* Helpers */
  import api from '../../helpers/api'
  import {editObject} from '../../helpers/general'
  import {passTitleUp} from '../../helpers/general'

  export default {
    data() {
      return {
        indexLoaded: false
      }
    },
    beforeCreate() {
      this.deletePost = api.deleteObject.bind(this, 'blog', 'posts');
      this.editPost = editObject.bind(this, 'blog');
      this.passTitleUp = passTitleUp.bind(this)
    },
    created() {
      this.setIndexTitle()
    },
    props: [
      'slug',
      'admin',
      'pageNumber'
    ],
    methods: {
      indexLoad() {
        this.indexLoaded = true;
      },
      returnToIndex() {
         this.$router.push({ path: '/blog' })
      },
      setIndexTitle() {
        if (!this.slug) {
          this.$emit('set-page-title', 'Blog')
        }
      }
    },
    watch: {
      $route: 'setIndexTitle'
    },
    components: {
      Post,
      Index
    }
  }

</script>

<style>
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Yantramanav', sans-serif;
  }
  
  .post-title {
    margin: .5em 0;
  }

  .post-title a {
    color: #000;
    text-decoration: none;
  }
  
  .post-date {
    margin: .25em 0; 
  }
  
  .post-title a:hover {
    text-decoration: underline;
  }

</style>
