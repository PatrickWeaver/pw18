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
      @delete="() => deleteBlob(blob.slug)"
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
      this.deleteBlob = api.deleteObject.bind(this, 'blobs', null);
      this.editBlob = editObject.bind(this, 'blobs');
    },
    props: [
      'admin',
      'blob'
    ],
    computed: {},
    components: {
      ObjectAdmin
    },
    methods: {}
  }  

</script>

<style>

  h3.blob-title {
    margin-bottom: .25em;  
  }

</style>
