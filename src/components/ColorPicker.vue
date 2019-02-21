<template>
<div class="color-picker">
  <picker v-model="colors" @input="$emit('new-color', colors.hex)" />
</div>
</template>

<script>
  
  import { Chrome } from 'vue-color'

  export default {
    data() {
      return {
        colors: {
          hex: this.color
        }
      }
    },
    props: [
      'color'
    ],
    components: {
      'picker': Chrome
    }
  } 


</script>

<style>
  .color-picker {
    position: relative;
  }
</style>