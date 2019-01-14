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
  import api from '../../helpers/api.js'
  
  export default {
    data() {
      return {
        status: '',
        pages: null,
        perPage: 5,
        pageList: [],
        currentPage: 1
      }
    },
    created() {
      this.getIndex()
    },
    computed: {
    },
    components: {
      BlobPreview
    },
    methods: {
      async getIndex() {
        var currentPageListData = await api.getIndexList('blobs', false, 'blobs_list', 'total_blobs', this.perPage, this.currentPage);
        this.pageList = currentPageListData.pageList
        this.pages = currentPageListData.pages
      }
    }
  }  
</script>