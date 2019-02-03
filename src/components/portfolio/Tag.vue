<template>

  <div class="tag-container">
    <a
      @click.prevent="filter ? filterBy : false"
      :href="filter ? '/portfolio?filter=' + tag.slug : false"
      :style="'background-color: ' + color"
      class="tag"
    >
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
      'tag',
      'filter'
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

<style>
  .tag-container {
    display: inline-block;
  }

  .tag {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0px 5px;
    display: inline-block;
    text-decoration: none;
    color: #333;
    margin: 5px;
  }
</style>