<template>
  <span class="url-with-label" v-if="url">
    
    <strong>{{ label }}: </strong>
    <a :href="url" target="blank">
      {{ readableUrl(url) }}
    </a>
  
  </span>
</template>

<script>
  
  export default {
    props: [
      'label',
      'url'
    ],
    methods: {
      readableUrl(url) {
        return url.substring(url.indexOf("//") + 2)
      }
    }
  }

</script>
