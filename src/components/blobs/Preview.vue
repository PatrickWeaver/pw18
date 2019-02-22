<template>
  <div v-if="blob">
    <h3 class="blob-title">{{ blob.title }}</h3>
    <ul>
      <li><a :href="'/blobs/' + blob.slug"><em>/{{ blob.slug }}</em></a></li>
      <li>{{ blob.created_date }}</li>
      <li>Hidden: {{ blob.is_hidden }}</li>
    </ul>
    <object-admin
      v-if="admin"
      @delete="deleteAndRemove"
      @edit="() => editBlob(blob.slug)"
    />
  </div>
</template>

<script>
  
  import ObjectAdmin from '../ObjectAdmin.vue'
  import api from '../../helpers/api'
  import {editObject} from '../../helpers/general'
  
  export default {
    beforeCreate() {
      var response = this.deleteBlob = api.deleteObject.bind(this, 'blobs', null);
      if (response) {
        this.editBlob = editObject.bind(this, 'blobs');
      }
    },
    props: [
      'admin',
      'blob',
      'index'
    ],
    computed: {},
    components: {
      ObjectAdmin
    },
    methods: {
      deleteAndRemove() {
        this.deleteBlob(this.blob.slug)
        this.$emit('delete', this.blob.slug, this.index)
      }
    
    }
  }  

</script>

<style>

  h3.blob-title {
    margin-bottom: .25em;  
  }

</style>
