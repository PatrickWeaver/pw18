<template>
  <ul
    v-if="pages > 1"
    class="pagination"
  >
    <li>Page:</li>
    <li
      v-for="index in pages"
      :key="index"
    >
      <a
        @click.prevent="goToPage(index)"
        :href="'/' + section + '/page/' + index + filterQs"
        :class="'page-number ' + [pageNumber == index ? 'active-page' : 'inactive-page']">
        {{ index }}
      </a>
    </li>
  </ul>

</template>

<script>

  export default {
    props: [
      'filter',
      'pages',
      'pageNumber',
      'section'
    ],
    computed: {
      filterQs() {
        return this.filter ? '?filter=' + this.filter : ''
      } 
    },
    methods: {
      goToPage(pageNumber) {
        this.$emit('go-to-page', pageNumber, this.filterQs)
      }
    }
  }

</script>

<style scoped>
  .pagination li {
    display: inline-block;
    margin: .25em;
  }

  .page-number {
    border-radius: 5px;
    padding: .125em .5em;
    background-color: #fbfbfb;
    text-decoration: none;
    color: #000000;
    border: 2px solid #fbfbfb;
  }

  .active-page {
    border: 2px solid #bfbfcf;
  }

  .inactive-page:hover {
    text-decoration: underline;
  }

</style>
