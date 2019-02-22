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
      <input
        type="text"
        v-model="color"
        :disabled="!status"
        :class="{'disabled-input': !status}"
        @click="showColorPicker = !showColorPicker"
      />
      <color-picker
        v-if="showColorPicker"
        color="#FF3333"
        @new-color="updateColor"
      />
      <edit-form-buttons
        :edit="currentSlug"
        :submit="submitNewTag"
      />
    </form>

  </div>
</template>

<script>
  
  /* Components */
  import EditFormButtons from '../EditFormButtons.vue'
  import ColorPicker from '../ColorPicker.vue'

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
        color: '',
        showColorPicker: false,
        colorMem: '#8F8F8F',
      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this);
      this.resetFields = resetFields.bind(this);
    },
    created() {
      if (this.currentSlug) {
        this.getTag()
        this.submitButtonText = 'Save'
      } else {
        this.$emit('set-page-title','New Tag')
      }
    },
    beforeRouteLeave(to, from, next) {
      this.resetFields()
      next()
    },
    components: {
      EditFormButtons,
      ColorPicker
    },
    computed: {
      autoSlug() {
        return slug(this.name)
      }
    },
    methods: {
      checkForAutofillSlug() {
        if (this.slug === slug(this.name) && !this.currentSlug) {
          this.autofillSlug = true
        }
      },
      async getTag() {
        var api_data = await(api.getData('/v1/portfolio/tags/' + this.currentSlug, null, this.admin))
        var tag = api_data.tag
        this.name = tag.name
        this.slug = tag.slug
        this.status = tag.status
        this.color = tag.color
        this.$emit('set-page-title', 'Edit: ' + tag.name)
      },
      async submitNewTag() {
        var path = '/v1/portfolio/tags/new/'
        if (this.currentSlug) {
          path = '/v1/portfolio/tags/' + this.currentSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/tags/' })
        } else {
          alert("Error: " + response.error)
        }
      },
      updateColor(color) {
        this.color = color
      }
    },
    props: [
      'currentSlug'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      },
      status() {
        if (this.status) {
          this.color = this.color === '' ? this.colorMem : this.color
        } else {
          this.colorMem = this.color === '' ? this.colorMem : this.color
          this.color = ''
        }
      }
    }
  }

</script>

<style>

  .disabled-input {
    cursor: not-allowed;
  }

</style>
