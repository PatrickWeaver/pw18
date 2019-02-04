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
      @set-page-title="passTitleUp"
    />

  </div>

</template>

<script>

  /* Components */
  import Blob from './blobs/Blob.vue'
  
  import {passTitleUp} from '../helpers/general'
  
  const customPageBlob = 'pw-18-';

  export default {
    data() {
      return {
        apiTimeout: false,
        apiLoaded: false
      }
    },
    created() {
      this.passTitleUp = passTitleUp.bind(this)
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
