<template>
  <div>
    <h2>
      Edit/New Tag
    </h2>

    <form>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Status:</label>
      <input type="checkbox" v-model="status" />
      <label>Color:</label>
      <input type="text" v-model="color" />
      <edit-form-buttons
        :edit="activeTagSlug"
        :submit="submitNewTag"
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
  import {slug} from '../../helpers/general'

  /* NPM */
  import * as snake from 'snakecase-keys'

  export default {
    data() {
      return {
        name: '',
        slug: '',
        autofillSlug: true,
        status: false,
        color: ''
      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this);
      this.resetFields = resetFields.bind(this);
    },
    created() {
      if (this.activeTagSlug) {
        this.getTag()
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
        return slug(this.name)
      }
    },
    methods: {
      checkForAutofillSlug() {
        if (this.slug === slug(this.name)) {
          this.autofillSlug = true
        }
      },
      async getTag() {
        var api_data = await(api.getData('/v1/portfolio/tags/' + this.activeTagSlug))
        var tag = api_data.tag
        this.name = tag.name
        this.slug = tag.slug
        this.status = tag.status
        this.color = tag.color
      },
      async submitNewTag() {
        var path = '/v1/portfolio/tags/new/'
        if (this.activeTagSlug) {
          path = '/v1/portfolio/tags/' + this.activeTagSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/tags/' })
        } else {
          alert("Error: " + response.error)
        }
      }
    },
    props: [
      'activeTagSlug'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
