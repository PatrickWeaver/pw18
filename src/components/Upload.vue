<template>
  <div>
    <h2>
      Upload
    </h2>
    <form>
      <label>File:</label>
      <input
        type="file"
        :name="file"
        ref="file"
        @change="uploadFile"
      >
      <p v-if="inProgress">
        Uploading file . . .
      </p>
      <button v-else @click.prevent="uploadFile">Upload</button>
    </form>
    <input v-if="url" v-model="url" />
  </div>
</template>

<script>
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data() {
      return {
        file: null,
        url: '',
        inProgress: false
      }
    },
    methods: {
      async uploadFile(event) {
        this.file = this.$refs.file.files[0];
        this.inProgress = true
        var path = '/v1/uploads/new/'
        var response = await(api.sendFile(this.file, path))
        if (response.success) {
          this.inProgress = false
          this.url = response.url
        } else {
          alert("Error: ")
          console.log(response)
        }
      }
    }
  }

</script>
