<template>
<div class="cover-image-container">
  <img 
    class="cover-image"
    :src="url"
    :alt="alt"
  />
</div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    }
  },
  props: [
    'url',
    'alt'
  ]
}
</script>

<style>
  
  .cover-image {
    max-width: 400px;
    float: right;
    margin: 0 10px 10px;
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    .cover-image-container {
      text-align: left;
    }
    .cover-image {
      float: none;
      margin: 0 auto 10px;
      max-width: 100%;
    }

  }
  

</style>