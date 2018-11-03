<template>

  <div
    class="blob"
    v-html="body"
  >

  </div>

</template>

<script>

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data() {
      return {
        body: ''
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getBlob()
    },
    props: [
      'slug'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getBlob'
    },
    methods: {
      async getBlob() {
        var api_data = await(api.getData('/v1/blobs/' + this.slug))
        if (api_data.blob) {
          this.body = api_data.blob.body.html
        } else {
          this.$router.push({ name: '404' })
        }
      }
    }
  }

</script>

<style scoped>


</style>
