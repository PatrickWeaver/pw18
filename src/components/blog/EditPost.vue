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
      <label>Cover Image URL:</label>
      <input type="text" v-model="coverImageUrl" />
      <label>Cover Image Alt Text:</label>
      <input type="text" v-model="coverImageAltText" />
      <label>Draft:</label>
      <input type="checkbox" v-model="draft" />
      <edit-form-buttons
        :edit="activePostSlug"
        :submit="submitNewPost"
      />
    </form>

  </div>
</template>

<script>
  
  /* Components */
  import EditFormButtons from '../EditFormButtons.vue'

  /* Helpers */
  import api from '../../helpers/api'
  import {updateSlug} from '../../helpers/general'
  import {resetFields} from '../../helpers/general'

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
        coverImageUrl: '',
        coverImageAltText: '',
        draft: false
      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this);
      this.resetFields = resetFields.bind(this);
    },
    created() {
      if (this.activePostSlug) {
        this.getBlogPost()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.resetFields()
      next()
    },
    components: {
      EditFormButtons
    },
    computed: {
      autoSlug() {
        return slug(this.title)
      }
    },
    methods: {
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
        this.coverImageUrl = post.cover_image_url
        this.coverImageAltText = post.cover_image_alt_text
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
          this.$router.push({ path: '/blog/' + response.slug })
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
