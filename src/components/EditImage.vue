<template>

  <div>
    
    <upload v-if="!imageUuid" />
    <h2 v-else>
      Edit Image
    </h2>
    
    <form id="new-image-form">
      <label>Image URL:</label>
      <input type="text" v-model="url">
      <label>Order:</label>
      <input type="number" v-model="order">
      <label>Alt Text:</label>
      <textarea v-model="altText" />
      <label>Caption:</label>
      <textarea v-model="caption" />
      <label v-if="!imageUuid">Cover Image?</label>
      <input
        v-if="!imageUuid"
        type="checkbox"
        v-model="cover"
      />
      <edit-form-buttons
        :edit="imageUuid"
        :submit="sendImage"
      />
    </form>
    
  </div>
</template>

<script>
  /* Components */
  import EditFormButtons from './EditFormButtons.vue'
  import Upload from './Upload.vue'
  
  /* Helpers */
  import api from '../helpers/api'
  import {resetFields} from '../helpers/general'
  
  /* NPM */
  import * as snake from 'snakecase-keys'
  
  
export default {
  data() {
    return {
      url: '',
      altText: '',
      caption: '',
      order: 0,
      cover: false
    }
  },
  beforeCreate() {
      this.resetFields = resetFields.bind(this);
  },
  created() { 
    if (this.imageUuid) {
      this.$emit('set-page-title', 'Edit Image')
      this.getImage()
      this.submitButtonText = 'Save'
    } else {
      // New image form (might be in another page)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.resetFields()
    next()
  },
  components: {
    EditFormButtons,
    Upload
  },
  props: [
    'apiObject',
    'projectSlug',
    'imageUuid',
    'admin'
  ],
  methods: {
    async sendImage() {
      var path = '/v1/portfolio/images/new/'
      if (this.imageUuid) {
        path = '/v1/portfolio/images/' + this.imageUuid + '/edit/'
      }
      var body = snake(this.$data);
      if (this.apiObject) {
        body = Object.assign(body, this.apiObject)
      }
      var response = await(api.sendData(body, path))
      if (response.success) {
        if (this.imageUuid) {
          // Editing existing
          this.$router.push({ path: '/portfolio/' + this.projectSlug })
        } else {
          // New image
          this.$emit('status', true)
          this.resetFields()
        }
      } else {
        this.$emit('status', false)
        console.log("!Error:", response.error)
        //alert("Error: " + response.error)
      }
    },
    async getImage() {
      var api_data = await(api.getData('/v1/portfolio/projects/' + this.projectSlug, null, this.admin))
      var project = api_data.project
      var image;
      for (var i in project.images) {
        if (project.images[i].uuid === this.imageUuid) {
          image = project.images[i];
          break;
        }
      }
      if (!image) {
        this.$router.push({ path: '/portfolio/' + this.projectSlug })
      }

      this.caption = image.caption
      this.altText = image.alt_text
      this.order = image.order
      this.url = image.url
      this.cover = image.cover

    }
  }
  
}

</script>