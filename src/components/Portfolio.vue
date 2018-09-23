<template>
  
  <div>
    <h2>Portfolio</h2>
    <ul>
      <PortfolioProjectIndex v-for="(project, index) in list" :project="project"></PortfolioProjectIndex>
    </ul>
  </div>

</template>

<script>
  
  /* Components */
  import PortfolioProjectIndex from './PortfolioProjectIndex.vue'
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data: () => {
      return {
        list: []
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getPortfolio()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolio'
    },
    methods: {
      async getPortfolio() {
        var list = await(api.getData('/v1/portfolio/projects/'))
        this.list = list.projects_list

      }
    },
    components: {
      PortfolioProjectIndex
    }
  }

</script>
