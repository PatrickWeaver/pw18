<template>
  <div>
    <img :style="'max-width: 300px'" :src="image.url" >
  </div>
  

</template>

<script>

  
  export default {
    data() {
      return {}
    },
    props: [
      'image'
    ],
    components: {
    }
  }  

</script>
