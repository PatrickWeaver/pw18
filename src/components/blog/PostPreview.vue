<template>
  <li class="blog-post-preview">
    <h3 class="post-title">
      <a :href="'/blog/' + post.slug" @click.prevent="activatePost" >
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
    <div v-html="postPreview"></div>
    <p class="read-more">
      <a :href="'/blog/' + post.slug" >Read More</a>
    </p>
    <object-admin
      v-if="admin"
      @delete="deletePost"
      @edit="editPost"
    ></object-admin>
  </li>
</template>

<script>
  
  import ObjectAdmin from '../ObjectAdmin.vue'
  import ReadableDate from '../ReadableDate.vue'
  import CoverImage from './CoverImage.vue'
  
  export default {
    props: [
      'index',
      'post',
      'admin'
    ],
    computed: {
      
      postPreview() {
        if (this.post.summary && this.post.summary != '') {
          return this.post.summary.html
        } else {
          return '<p>' + this.post.post_preview + '</p>'
        }
      }
      
    },
    components: {
      ObjectAdmin,
      ReadableDate,
      CoverImage
    },
    methods: {
      activatePost(event) {
        this.$emit('activate-post', this.post.slug)
      },
      deletePost() {
        this.$emit('delete', this.post.slug, this.index) 
      },
      editPost() {
        this.$emit('edit', this.post.slug)
      }
    }
  }  

</script>

<style>

  .blog-post-preview {
    overflow: auto;
  }

  p.read-more {
    margin: -.5em 0 .5em;
  }

</style>
