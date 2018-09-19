<template>

  <div :style="'border: 1px solid black; padding: 10px 15px; display: inline-block; background-color: ' + color">
    <a :href="'/projects?filter=' + tag.slug" >{{ tag.name }}</a>
  </div>

</template>

<script>

  
  export default {
    data() {
      return {
        color: this.tag.color ? this.tag.color : "#ffffff"
      }
    },
    props: [
      'tag'
    ],
    components: {
    }
  }  

</script>
