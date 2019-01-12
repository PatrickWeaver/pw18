<template>

  <div>
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <blob id="about-text" :slug="slug">
    </blob>

  </div>

</template>

<script>

  /* Components */
  import Blob from './blobs/Blob.vue'

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

<style>


</style>
