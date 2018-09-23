<template>
  
  <div>
    <h2>Portfolio</h2>
    <div v-if="activeProjectSlug">
      <PortfolioProject id="active-project" :slug=activeProjectSlug ></PortfolioProject>
    </div>
    <div v-else>
      <ul>
        <PortfolioProjectIndex v-for="(project, index) in list" :key="project.slug" :project="project" @activate-project="activateProject"></PortfolioProjectIndex>
      </ul>
    </div>
    
    
  </div>

</template>

<script>
  
  /* Components */
  import PortfolioProjectIndex from './PortfolioProjectIndex.vue'
  import PortfolioProject from './PortfolioProject.vue'
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data: () => {
      return {
        list: []
      }
    },
    computed: {

    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getPortfolioIndex()
    },
    props: [
      'activeProjectSlug'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioIndex'
    },
    methods: {
      async getPortfolioIndex() {
        if (!this.activeProjectSlug && this.list.length === 0) {
          var list = await(api.getData('/v1/portfolio/projects/'))
          this.list = list.projects_list
        }
      },
      activateProject(slug) {
        this.$router.push({ path: `/portfolio/${slug}` })
      } 
        
    },
    components: {
      PortfolioProjectIndex,
      PortfolioProject
    }
  }

</script>
