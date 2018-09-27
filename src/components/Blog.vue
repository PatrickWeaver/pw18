<template>

  <div>
    <h2>Blog</h2>
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
    <div v-else>
      <ul>
        <blog-post-preview
          v-for="(post, index) in list"
          :key="post.slug"
          :post="post"
          :admin="admin"
          @activate-post="activatePost"
          @edit="editPost"
          @delete="deletePost"
        ></blog-post-preview>
      </ul>
    </div>
  </div>

</template>

<script>

   /* Components */
  import BlogPostPreview from './BlogPostPreview.vue'
  import BlogPost from './BlogPost.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getBlogPosts()
    },
    props: [
      'activePostSlug',
      'admin'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getBlogPosts'
    },
    methods: {
      async getBlogPosts() {
        if (!this.activePostSlug && this.list.length === 0) {
          var list = await(api.getData('/v1/blog/posts/'))
          this.list = list.posts_list
        }
      },
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
      }
    },
    components: {
      BlogPostPreview,
      BlogPost
    }
  }

</script>
