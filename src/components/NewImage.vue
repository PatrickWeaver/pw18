<template>

  <div>
    
    <upload/>
    
    <form id="new-image-form">
      <label>Image URL:</label>
      <input type="text" v-model="newImageUrl">
      <label>Order:</label>
      <input type="number" v-model="newImageOrder">
      <label>Alt Text:</label>
      <textarea v-model="newImageAltText" />
      <label>Caption:</label>
      <textarea v-model="newImageCaption" />
      <label>Cover Image?</label>
      <input type="checkbox" v-model="newImageCover" />
      <button @click.prevent="addImage(newImageUrl)">Add Image</button>
    </form>
    
  </div>

</template>

<script>
  
  import api from '../helpers/api'
  import Upload from './Upload.vue'
  
export default {
  data() {
    return {
      newImageUrl: null,
      newImageOrder: 0,
      newImageAltText: null,
      newImageCaption: null,
      newImageCover: false
    }
  },
  components: {
    Upload
  },
  props: [
    'apiObject'
  ],
  methods: {
    async addImage(url) {
      var path = '/v1/portfolio/images/new/'
      var body = {
        url: url,
        // Order and cover should maybe be in apiObject? But it's also something that coudl get reused.
        order: this.newImageOrder,
        cover: this.newImageCover,
        alt_text: this.newImageAltText,
        caption: this.newImageCaption
      }
      body = Object.assign(body, this.apiObject)
      var response = await(api.sendData(body, path))
      if (response.success) {
        this.$emit('status', true)
        this.newImageUrl = ''
        this.newImageAltText = ''
        this.newImageCaption = ''
      } else {
        this.$emit('status', false)
        alert("Error: " + response.error)
      }
    }
  }
  
}

</script>