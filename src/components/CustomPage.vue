<template>

  <div>
    <blob id="about-text" :slug="customPageSlug">
    </blob>
  </div>

</template>

<script>

  /* Components */
  import Blob from './Blob.vue'

  export default {
    data() {
      return {}
    },
    methods: {
    },
    components: {
      Blob
    },
    props: [
      'customPageSlug'
    ]

  }

</script>

<style>


</style>
