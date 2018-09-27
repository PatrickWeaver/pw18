<template>
  <li class="blog-post-preview">
    <h3><a :href="'/blog/' + post.slug" @click.prevent="activatePost" >{{ post.title }}</a></h3>
    <h5>{{ post.post_date }}</h5>
    <p>{{ postPreview }} <a v-if="!post.full_post_in_preview" :href="'/blog/' + post.slug" >Read More</a></p>
    <object-admin
      v-if="admin"
      @delete="deletePost"
      @edit="editPost"
    ></object-admin>
  </li>
</template>

<script>
  
  import ObjectAdmin from './ObjectAdmin.vue'
  
  export default {
    props: [
      'index',
      'post',
      'admin'
    ],
    computed: {
      postPreview() {
        if (this.post.summary != '') {
          return this.post.summary
        } else {
          return this.post.post_preview
        }
      }
      
    },
    components: {
      ObjectAdmin
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
