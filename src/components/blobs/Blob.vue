<template>
  <div v-if="loaded">
    <!-- Only show title on blob view, not custom page -->
    <h3 v-if="showTitle">
      {{ title }}
    </h3>
    <h4 v-if="hidden">
      Hidden
    </h4>
    <div
      class="blob"
      v-html="body"
    />
    <p v-if="redirect"><strong>Redirect:</strong> <a :href="redirect">{{ redirect }}</a></p>
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
        body: '',
        hidden: false,
        redirect: ''
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
        var api_data = await(api.getData('/v1/blobs/' + this.slug, {}, this.admin))
        if (api_data.blob) {
          var blob = api_data.blob
          if (this.blobPage && blob.redirect && blob.redirect.plaintext) {
            if (blob.redirect.plaintext.substring(0, 4) === 'http') {
              window.location.replace(blob.redirect.plaintext)
            } else {
              this.$router.push({ name: 'custom-page', params: { blobSlug: blob.redirect } })
            }
          } else {
            this.body = blob.body.html
            this.title = blob.title
            this.hidden = blob.hidden
          }

          this.redirect = blob.redirect
          
          // If blob is in a Page component
          if (this.blobPage) {
            this.$emit('set-page-title', blob.title)
          }
          this.loaded = true
          this.$emit('set-page-title', this.title)
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
