<template>
  <div>
    <h3 class="blob-title">{{ blob.title }}</h3>
    <ul>
      <li><em>/{{ blob.slug }}</em></li>
      <li>{{ blob.created_date }}</li>
      <li>Hidden: {{ blob.hidden }}</li>
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
