<template>

  <div>
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <blob id="about-text" :slug="blobSlug">
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
