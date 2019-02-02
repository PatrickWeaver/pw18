<template>
  <div>
    <pagination
      v-if="currentPage > 1"
      :pages="pages"
      :page-number="currentPage"
      :section="'portfolio'"
      :filter="filter"
      @go-to-page="goToPage"
    />
    <div v-if="filterTag" class="filter-status">
      <h3>Filtered By: </h3>
      <tag
        v-if="filterTag"
        @filter-by="filterBy"
        :tag="filterTag"
      />
      <button @click="$emit('clear-filter')">❌  Remove Filter</button>
    </div>
    <ul>
      <index-project
        v-for="(project, index) in pageList"
        :admin="admin"
        :key="project.slug"
        :index="index"
        :project="project"
        @filter-by="filterBy"
        @activate-project="activateProject"
        @delete="deleteProject"
        @edit="editProject"
      />
    </ul>
    <pagination
      :pages="pages"
      :page-number="currentPage"
      :section="'portfolio'"
      :filter="filter"
      @go-to-page="goToPage"
    />
  </div>
</template>

<script>

  import Pagination from '../Pagination.vue'
  import IndexProject from './IndexProject.vue'
  import Tag from './Tag.vue'

  export default {
    components: {
      IndexProject,
      Tag,
      Pagination
    },
    created() {
      if (this.currentPage > this.pages) {
        this.$router.push({ name: '404'});
      }
    },
    props: [
      'pages',
      'filter',
      'goToPage',
      'filterBy',
      'filterTag',
      'admin',
      'pageList',
      'activateProject',
      'deleteProject',
      'editProject',
      'currentPage'
    ]
  }

</script>

<style>

</style>