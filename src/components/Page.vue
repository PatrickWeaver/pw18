<template>

  <div>
    <h2 v-if="title" class="page-title">{{ title }}</h2>
    
    <div
      v-if="apiTimeout && !apiLoaded"
      class="page-blob"
    >
      <p>{{ backup }}</p>
    </div>
    
    <blob
      v-else
      class="page-blob"
      :slug="slug"
      :admin="admin"
      :api-status="apiStatus"
      :blob-page="true"
      @set-page-title="setPageTitle"
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
        apiTimeout: false,
        apiLoaded: false
      }
    },
    created() {
      setTimeout(() => {
        this.apiTimeout = !this.apiLoaded
      }, 5000)
    },
    computed: {
      slug: function() {
        return customPageBlob + this.blobSlug
      }
    },
    methods: {
      apiStatus(success) {
        this.apiLoaded = success
      },
      setPageTitle(title) {
        console.log("SETTING TITLE", title)
        document.title += ' | ' + title
      }
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
