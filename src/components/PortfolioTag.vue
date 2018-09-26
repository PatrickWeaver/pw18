<template>

  <div >
    <a
      @click.prevent="filterBy"
      :href="'/portfolio?filter=' + tag.slug"
      :style="'border: 1px solid black; padding: 10px 15px; display: inline-block; background-color: ' + color" >
      {{ tag.name }}
    </a>
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
    },
    methods: {
      filterBy() {
        this.$emit('filter-by', this.tag.slug)
      }
    }
  }

</script>
