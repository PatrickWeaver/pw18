<template>
  <div v-if="blob">
    <h3 class="blob-title">{{ blob.title }}</h3>
    <ul>
      <li><em>/{{ blob.slug }}</em></li>
      <li>{{ blob.created_date }}</li>
      <li>Hidden: {{ blob.hidden }}</li>
      <div v-if="blob.body" v-html="blob.body.html" />
    </ul>
  </div>
</template>

<script>
  
  export default {
    props: [
      'blob'
    ],
    computed: {
    },
    components: {
    },
    methods: {
    }
  }  

</script>

<style>

  h3.blob-title {
    margin-bottom: .25em;  
  }

</style>
