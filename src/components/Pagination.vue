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
        :href="'/' + section + '/page/' + index"
        :class="'page-number ' + [pageNumber == index ? 'active-page' : '']">
        {{ index }}
      </a>
    </li>
  </ul>

</template>

<script>

  export default {
    props: [
      'pages',
      'pageNumber',
      'section'
    ]
  }

</script>

<style>
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

</style>
