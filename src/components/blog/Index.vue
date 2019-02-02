<template>
  <div>
    <!-- Top pagination for pages after 1 -->
    <pagination
      v-if="currentPage > 1"
      :pages="pages"
      :page-number="currentPage"
      :section="'blog'"
      @go-to-page="goToPage"
    >
    </pagination>

    <!-- if blog posts returned from API -->
    <!-- List of post previews -->
    <ul v-if="pageList.length > 0">
      <post-preview
        v-for="(post) in pageList"
        :key="post.slug"
        :post="post"
        :admin="admin"
        @activate-post="activatePost"
        @edit="editPost"
        @delete="removePostFromListAndDelete"
      ></post-preview>
    </ul>
        
    <!-- Else (no posts or error) -->
    <div v-else>
      <p>{{ status }}</p>  
    </div>

    <!-- Bottom pagination on all pages if more than one page -->
    <pagination
      :pages="pages"
      :page-number="currentPage"
      :section="'blog'"
      @go-to-page="goToPage"
    ></pagination>
  </div>
</template>

<script>

   /* Components */
  import PostPreview from './PostPreview.vue'
  import Pagination from '../Pagination.vue'

  /* Helpers */
  import api from '../../helpers/api'
  
  const delayTime = 1000;

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
    async created() {
      await this.getIndex();
      if (this.currentPage > this.pages) {
        this.$router.push({ name: '404'});
      }
    },
    watch: {
      pageNumber: 'getIndex'
    },
    props: [
      'admin',
      'pageNumber',
      'editPost',
      'deletePost'
    ],
    methods: {
      async getIndex() {
        this.setLoadingMessage('Loading Blog Posts');
        this.currentPage = this.pageNumber ? this.pageNumber : this.currentPage
        var currentPageListData = await api.getIndexList('blog', 'posts', 'posts_list', 'total_posts', this.perPage, this.currentPage, this.admin)
        this.pageList = currentPageListData.pageList
        this.pages = currentPageListData.pages
        this.$emit('index-load')
        this.setLoadingMessage('');
      },
      setLoadingMessage(message) {
        setTimeout((message) => {this.status = message}, delayTime);
      },
      activatePost(slug) {
        this.$router.push({ path: '/blog/' + slug })
      },
      async removePostFromListAndDelete(slug, index) {
        const removedPost = this.pageList.splice(index, 1)
        var success = await this.deletePost(slug)
        if (!success) {
          this.pageList.splice(index, 0, removedPost[0])
        }
      },
      goToPage(pageNumber, filterQs) {
        this.pageList = []
        this.$router.push({ path: '/blog/page/' + pageNumber + '/' + filterQs })
      }
      
    },
    components: {
      PostPreview,
      Pagination
    }
  }

</script>


<style>
</style>