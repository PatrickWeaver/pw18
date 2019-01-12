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
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data() {
      return {
        status: '',
        list: [],
        pageList: [],
        pages: 1,
        perPage: 5
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getBlobs()
      var loadingMessage = "Loading blog posts."
      var errorMessage = "Error loading blog posts."
      setTimeout(() => this.status = loadingMessage, 1 * 1000)
      setTimeout(() => this.status = errorMessage, 10 * 1000)
    },
    props: [
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
      async getBlobs() {
        if (this.list.length === 0) {
          var apiData = await(api.getIndex('blobs'))
          this.list = apiData.blobs_list
          this.pages = Math.floor(apiData.total_blobs/this.perPage) + 1
        }
        var pageStart = (this.currentPage - 1) * this.perPage
        var pageEnd = pageStart + this.perPage
        this.pageList = this.list.slice(pageStart, pageEnd)
      }
    }
  }  

</script>