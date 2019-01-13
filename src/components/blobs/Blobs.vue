<template>
  <div>
    <h2 class="page-title">Blobs</h2>
    <ul>
      <blob-preview 
        v-for="(blob) in pageList"
        :key="blob.slug"
        :blob="blob"
      />
    </ul>
  </div>
</template>

<script>
  
  /* Components */
  import BlobPreview from './BlobPreview.vue'
  
  export default {
    data() {
      return {
        status: '',
        pages: 1,
        perPage: 5
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.$emit('set-list-type', 'blobs');
      this.$emit('get-from-api', 'blobs', false, 'blobs_list', 'total_blobs', this.pages, this.perPage, this.currentPage)
      var loadingMessage = "Loading blog posts."
      var errorMessage = "Error loading blog posts."
      setTimeout(() => this.status = loadingMessage, 1 * 1000)
      setTimeout(() => this.status = errorMessage, 10 * 1000)
    },
    props: [
      'list',
      'pageList'
    ],
    computed: {
      currentPage() {
        return this.pageNumber ? this.pageNumber : 1
      }
    },
    components: {
      BlobPreview
    },
    methods: {
    }
  }  

</script>