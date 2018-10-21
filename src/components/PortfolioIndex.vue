<template>
  <div>
    <pagination
      v-if="currentPage > 1"
      :pages="pages"
      :pageNumber="currentPage"
      :section="'portfolio'"
      :filter="filter"
      @go-to-page="goToPage"
    >
    </pagination>
    <div v-if="filterTag" class="filter-status">
    <h3>Filtered By: </h3>
    <portfolio-tag
      v-if="filterTag"
      @filter-by="filterBy"
      :tag="filterTag"
    ></portfolio-tag>
    <button @click="$emit('clear-filter')">❌  Remove Filter</button>
    </div>
    <ul>
    <portfolio-project-index
      v-for="(project, index) in pageList"
      :admin="admin"
      :key="project.slug"
      :index="index"
      :project="project"
      @filter-by="filterBy"
      @activate-project="activateProject"
      @delete="deleteProject"
      @edit="editProject"
    ></portfolio-project-index>
    </ul>
    <pagination
      :pages="pages"
      :pageNumber="currentPage"
      :section="'portfolio'"
      :filter="filter"
      @go-to-page="goToPage"
    ></pagination>
  </div>
</template>

<script>

  import Pagination from './Pagination.vue'
  import PortfolioProjectIndex from './PortfolioIndexProject.vue'
  import PortfolioTag from './PortfolioTag.vue'

  export default {
    components: {
      PortfolioProjectIndex,
      PortfolioTag,
      Pagination
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