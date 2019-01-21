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
  methods: {
    async addImage(url) {
      var path = '/v1/portfolio/images/new/'
      var body = {
        url: url,
        project_id: this.projectId,
        order: this.newImageOrder,
        alt_text: this.newImageAltText,
        caption: this.newImageCaption,
        cover: this.newImageCover
      }
      var response = await(api.sendData(body, path))
      if (response.success) {
        this.getPortfolioProject()
        this.newImageUrl = ''
        this.newImageAltText = ''
        this.newImgaeCaption = ''
      } else {
        alert("Error: " + response.error)
      }
    }
  }
  
}

</script>