<template>
  <div>
    <h2>
      Edit/New Project
    </h2>

    <form>
      <label>Title:</label>
      <input type="text" v-model="title" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Summary:</label>
      <textarea v-model="summary"></textarea>
      <label>Body:</label>
      <textarea v-model="body"></textarea>
      <label>Post Date:</label>
      <input type="date" :value="postDate && postDate.toISOString().split('T')[0]"
                     @input="postDate = $event.target.valueAsDate" />
      <label>Draft:</label>
      <input type="checkbox" v-model="draft" />
      <button @click.prevent="submitNewPost">Submit</button>
    </form>

  </div>
</template>

<script>

  /* Helpers */
  import api from '../helpers/api'

  /* NPM */
  import * as slug from 'slug'
  import * as snake from 'snakecase-keys'

  export default {
    data() {
      return {
        title: '',
        slug: '',
        autofillSlug: true,
        summary: '',
        body: '',
        postDate: new Date(),
        draft: false
      }
    },
    created() {
      if (this.activePostSlug) {
        this.getBlogPost()
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getBlogPost'
    },
    components: {
    },
    computed: {
      autoSlug() {
        return slug(this.title)
      }
    },
    methods: {
      updateSlug() {
        if (this.autofillSlug) {
          this.slug = slug(this.title)
        }
      },
      checkForAutofillSlug() {
        if (this.slug === slug(this.title)) {
          this.autofillSlug = true
        }
      },
      async getBlogPost() {
        var api_data = await(api.getData('/v1/blog/posts/' + this.activePostSlug))
        var post = api_data.post
        this.title = post.title
        this.slug = post.slug
        this.summary = post.summary.markdown
        this.body = post.body.markdown
        this.postDate = post.post_date ? new Date(post.post_date) : null
        this.draft = post.draft
      },
      async submitNewPost() {
        var path = '/v1/blog/posts/new/'
        if (this.activePostSlug) {
          path = '/v1/blog/posts/' + this.activePostSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/writing/' + response.slug })
        } else {
          alert("Error: " + response.error)
        }
      }
    },
    props: [
      'activePostSlug'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
