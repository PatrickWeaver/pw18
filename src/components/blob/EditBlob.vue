<template>
  <div>
    <h2>
      Edit/New Blob
    </h2>

    <form>
      <label>Title:</label>
      <input type="text" v-model="title" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Body:</label>
      <textarea v-model="body"></textarea>
      <label>Hidden from Index:</label>
      <input type="checkbox" v-model="isHidden" />
      <label>Redirect:</label>
      <input type="text" v-model="redirect" />
      <edit-form-buttons
        :edit="activeBlobSlug"
        :submit="submitNewBlob"
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
        body: '',
        isHidden: false,
        redirect: ''
      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this);
      this.resetFields = resetFields.bind(this);
    },
    created() {
      if (this.activeBlobSlug) {
        this.getBlob()
        this.submitButtonText = 'Save'
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
      async getBlob() {
        var api_data = await(api.getData('/v1/blobs/' + this.activeBlobSlug))
        var blob = api_data.blob
        this.title = blob.title
        this.slug = blob.slug
        this.body = blob.body.markdown
        this.isHidden = blob.is_hidden
        this.redirect = blob.redirect
      },
      async submitNewBlob() {
        var path = '/v1/blobs/new/'
        if (this.activeBlobSlug) {
          path = '/v1/blobs/' + this.activeBlobSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/blobs/' + response.slug })
        } else {
          alert("Error: " + response.error)
        }
      }
    },
    props: [
      'activeBlobSlug'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
