<template>
  <div>
    <h2 class="page-title">Blobs</h2>
    <ul>
      <preview 
        :admin="admin"
        v-for="(blob, index) in pageList"
        :key="blob.slug"
        :blob="blob"
        :index="index"
        @delete="removeBlobPreview"
      />
    </ul>
  </div>
</template>

<script>
  
  /* Components */
  import Preview from './Preview.vue'
  
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
      this.$emit('set-page-title', 'Blobs')
    },
    props: [
      'admin'
    ],
    computed: {
    },
    components: {
      Preview
    },
    methods: {
      async getIndex() {
        var currentPageListData = await api.getIndexList('blobs', false, 'blobs_list', 'total_blobs', this.perPage, this.currentPage, this.admin)
        this.pageList = currentPageListData.pageList
        this.pages = currentPageListData.pages
      },
      removeBlobPreview(slug, index) {
        this.pageList.splice(index, 1)
        if (this.pageList.length < 1) {
          this.$router.go()
        }
      }
    }
  }  
</script>