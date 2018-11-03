<template>

  <div class="page">
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <blob id="about-text" :slug="slug">
    </blob>

  </div>

</template>

<script>

  /* Components */
  import Blob from './Blob.vue'

  export default {
    data() {
      return {}
    },
    computed: {
      slug: function() {
        return 'pw-18-' + this.blobSlug
      }
    },
    methods: {
    },
    components: {
      Blob
    },
    props: [
      'title',
      'blobSlug'
    ]

  }

</script>

<style scoped>
  
  .page img, .page iframe {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  
  .page img.small, .page iframe.small {
    max-width: 300px;
    display: inline;
    margin: .5em;
  }


</style>
