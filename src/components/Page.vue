<template>

  <div>
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <div
      v-if="apiTimeout"
      class="page-blob"
    >
      <p>{{ backup }}</p>
    </div>
    
    <blob
      v-else
      class="page-blob"
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
      return {
        apiTimeout: true
      }
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
      'blobSlug',
      'backup'
    ]

  }

</script>

<style>


</style>
