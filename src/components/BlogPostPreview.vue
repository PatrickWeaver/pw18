<template>
  <li>
    <h3><a :href="'/blog/' + post.slug" @click.prevent="activatePost" >{{ post.title }}</a></h3>
    <h5>{{ post.post_date }}</h5>
    <p>{{ postPreview }} <a v-if="!post.full_post_in_preview" :href="'/blog/' + post.slug" >Read More</a></p>
  </li>
</template>

<script>
  
  export default {
    props: [
      'post'
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
    },
    methods: {
      activatePost(event) {
        this.$emit('activate-post', this.post.slug)
      }
    }
  }  

</script>
