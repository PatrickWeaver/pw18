<template>
  <div v-if="loaded">
    <!-- Only show title on blob view, not custom page -->
    <h3 v-if="showTitle">
      {{ title }}
    </h3>
    <div
      class="blob"
      v-html="body"
    />
    <object-admin
      v-if="admin"
      @delete="() => deleteBlob(this.slug)"
      @edit="() => editBlob(this.slug)"
    />
  </div>

</template>

<script>

  /* Helpers */
  import api from '../../helpers/api'
  import {editObject} from '../../helpers/general'
  
  /* Components */
  import ObjectAdmin from '../ObjectAdmin.vue'
  

  export default {
    data() {
      return {
        loaded: false,
        title: '',
        body: ''
      }
    },
    beforeCreate() {
      this.deleteBlob = api.deleteObject.bind(this, 'blobs', null);
      this.editBlob = editObject.bind(this, 'blobs');
    },
    created() {
      this.getBlob()
    },
    props: [
      'admin',
      'slug',
      'showTitle',
      'apiStatus',
      'blobPage',
      'setPageTitle'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getBlob'
    },
    components: {
      ObjectAdmin
    },
    methods: {
      async getBlob() {
        var api_data = await(api.getData('/v1/blobs/' + this.slug))
        if (api_data.blob) {
          this.body = api_data.blob.body.html
          this.title = api_data.blob.title
          
          // If blob is in a Page component
          if (this.blobPage) {
            this.$emit('set-page-title', api_data.blob.title)
          }
          this.loaded = true
          if (this.apiStatus) {
            this.apiStatus(true)
          }
        } else {
          this.$router.push({ name: '404' })
        }
      }
    }
  }

</script>

<style>


</style>
