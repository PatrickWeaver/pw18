<template>

  <div>
    <h2 class="page-title">Blog</h2>
    <div v-if="activePostSlug">
      <blog-post
        :index-loaded="list.length === 0 ? false : true"
        :slug="activePostSlug"
        :admin="admin"
        @return-to-index="returnToIndex"
        @edit="editPost"
        @delete="findAndDeletePost"
      ></blog-post>
    </div>
    <div v-else-if="list.length > 0">
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
    <div v-else>
      <p>{{ status }}</p>  
    </div>
  </div>

</template>

<script>

   /* Components */
  import BlogPostPreview from './BlogPostPreview.vue'
  import BlogPost from './BlogPost.vue'
  import Pagination from './Pagination.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data() {
      return {
        status: '',
        pages: 1,
        perPage: 5
      }
    },
    computed: {
      currentPage() {
        return this.pageNumber ? this.pageNumber : 1
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.$emit('get-from-api', 'blog', 'posts', 'posts_list', 'total_posts', this.pages, this.perPage, this.currentPage)
      var loadingMessage = "Loading blog posts."
      var errorMessage = "Error loading blog posts."
      setTimeout(() => this.status = loadingMessage, 1 * 1000)
      setTimeout(() => this.status = errorMessage, 10 * 1000)
    },
    props: [
      'activePostSlug',
      'admin',
      'pageNumber',
      'list',
      'pageList'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getBlogPosts'
    },
    methods: {
      activatePost(slug) {
        this.$router.push({ path: '/blog/' + slug })
      },
      returnToIndex() {
         this.$router.push({ path: '/blog' })
      },
      findAndDeletePost(post) {
        this.deletePost(post.slug, this.list.indexOf(post))
      },
      async deletePost(slug, index) {
        var response = await(api.sendData({}, '/v1/blog/posts/' + slug + '/delete/'))
        if (response.success) {
          this.list.splice(index, 1)
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
