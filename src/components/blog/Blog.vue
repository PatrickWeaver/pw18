<template>

  <div>
    <h2 class="page-title">Blog</h2>
    <!-- if -->
    <div v-if="activePostSlug">
      <blog-post
        :index-loaded="pageList.length === 0 ? false : true"
        :slug="activePostSlug"
        :admin="admin"
        @return-to-index="returnToIndex"
        @edit="editPost"
        @delete="findAndDeletePost"
      ></blog-post>
    </div>
    <!-- Else If-->
    <div v-else-if="pageList.length > 0">
      <pagination
        v-if="currentPage > 1"
        :pages="pages"
        :page-number="currentPage"
        :section="'blog'"
        @go-to-page="goToPage"
      >
      </pagination>
      <ul>
        <blog-post-preview
          v-for="(post) in pageList"
          :key="post.slug"
          :post="post"
          :admin="admin"
          @activate-post="activatePost"
          @edit="editPost"
          @delete="deletePost"
        ></blog-post-preview>
      </ul>
      <pagination
        :pages="pages"
        :page-number="currentPage"
        :section="'blog'"
        @go-to-page="goToPage"
      ></pagination>
    </div>
    <!-- Else -->
    <div v-else>
      <p>{{ status }}</p>  
    </div>
  </div>

</template>

<script>

   /* Components */
  import BlogPostPreview from './BlogPostPreview.vue'
  import BlogPost from './BlogPost.vue'
  import Pagination from '../Pagination.vue'

  /* Helpers */
  import api from '../../helpers/api'

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
    watch: {
      pageNumber: 'getIndex'
    },
    props: [
      'activePostSlug',
      'admin',
      'pageNumber'
    ],
    methods: {
      async getIndex() {
        this.currentPage = this.pageNumber ? this.pageNumber : this.currentPage
        var currentPageListData = await api.getIndexList('blog', 'posts', 'posts_list', 'total_posts', this.perPage, this.currentPage);
        this.pageList = currentPageListData.pageList
        this.pages = currentPageListData.pages
      },
      activatePost(slug) {
        this.$router.push({ path: '/blog/' + slug })
      },
      returnToIndex() {
         this.$router.push({ path: '/blog' })
      },
      findAndDeletePost(post) {
        this.deletePost(post.slug, this.pageList.indexOf(post))
        this.pageList.splice(index, 1)
      },
      async deletePost(slug) {
        var response = await(api.sendData({}, '/v1/blog/posts/' + slug + '/delete/'))
        if (response.success) {
          this.$router.push({ path: '/blog' })
        } else {
          alert("Error: " + response.error)
        }
      },
      editPost(slug) {
        this.$router.push({ path: '/blog/' + slug + '/edit' })
      },
      goToPage(pageNumber, filterQs) {
        this.$router.push({ path: '/blog/page/' + pageNumber + '/' + filterQs })
      }
    },
    components: {
      BlogPostPreview,
      BlogPost,
      Pagination
    }
  }

</script>

<style>
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Yantramanav', sans-serif;
  }
  
  .post-title {
    margin: .5em 0;
  }

  .post-title a {
    color: #000;
    text-decoration: none;
  }
  
  .post-date {
    margin: .25em 0; 
  }
  
  .post-title a:hover {
    text-decoration: underline;
  }

</style>
