<template>
  <div>
    <h2>
      Edit/New Tag
    </h2>

    <form>
      <label>URL:</label>
      <input type="text" v-model="url" />
      <label>Alt Text:</label>
      <input type="text" v-model="altText" />
      <label>Caption:</label>
      <input type="text" v-model="caption" />
      <label>Order:</label>
      <input type="number" v-model="order" />
      <edit-form-buttons
        :edit="imageUuid"
        :submit="submitNewImage"
      />
    </form>

  </div>
</template>

<script>
  
  /* Components */
  import EditFormButtons from '../EditFormButtons.vue'

  /* Helpers */
  import api from '../../helpers/api'
  import {resetFields} from '../../helpers/general'
  
  /* NPM */
  import * as snake from 'snakecase-keys'

  export default {
    data() {
      return {
        url: '',
        altText: '',
        caption: '',
        order: 0
      }
    },
    beforeCreate() {
      this.resetFields = resetFields.bind(this);
    },
    created() {
      this.$emit('set-page-title', 'Edit Image')
      if (this.imageUuid) {
        this.getImage()
        this.submitButtonText = 'Save'
      } else {
        // Really this shouldn't happen?
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
    },
    methods: {
      async getImage() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.activeProjectSlug, null, this.admin))
        var project = api_data.project
        var image;
        for (var i in project.images) {
          if (project.images[i].uuid === this.imageUuid) {
            image = project.images[i];
            break;
          }
        }
        if (!image) {
          this.$router.push({ path: '/portfolio/' + this.activeProjectSlug })
        }
        
        this.caption = image.caption
        this.altText = image.alt_text
        this.order = image.order
        this.url = image.url
        
      },
      async submitNewImage() {
        var path = '/v1/portfolio/images/new/'
        if (this.imageUuid) {
          path = '/v1/portfolio/images/' + this.imageUuid + '/edit/'
        }
        console.log('PATHH:', path)
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/portfolio/' + this.activeProjectSlug })
        } else {
          alert("Error: " + response.error)
        }
      }
    },
    props: [
      'activeProjectSlug',
      'imageUuid'
    ],
    watch: {
    }
  }

</script>
