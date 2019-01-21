<template>

  <div>
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <blob
      id="about-text"
      :slug="slug"
      :admin="admin"
    />

  </div>

</template>

<script>

  /* Components */
  import Blob from './blobs/Blob.vue'
  
  const customPageBlob = 'pw-18-';

  export default {
    data() {
      return {}
    },
    computed: {
      slug: function() {
        return customPageBlob + this.blobSlug
      }
    },
    methods: {
    },
    components: {
      Blob
    },
    props: [
      'admin',
      'title',
      'blobSlug'
    ]

  }

</script>

<style>


</style>
