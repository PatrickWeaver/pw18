<template>

  <div>
    <h2>Portfolio</h2>
    <div v-if="activeProjectSlug">
      <portfolio-project
        id="active-project"
        :slug="activeProjectSlug"
        @delete-project="findAndDeleteProject"
        @edit-project="editProject"
      ></portfolio-project>
    </div>
    <div v-else>
      <ul>
        <portfolio-project-index
          v-for="(project, index) in list"
          :key="project.slug"
          :index="index"
          :project="project"
          @activate-project="activateProject"
          @delete-project="deleteProject"
          @edit-project="editProject"
        ></portfolio-project-index>
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
          var api_data = await(api.getData('/v1/portfolio/projects/'))
          this.list = api_data.projects_list
        }
      },
      activateProject(slug) {
        this.$router.push({ path: '/portfolio/' + slug })
      },
      findAndDeleteProject(project) {
        this.deleteProject(project.slug, this.list.indexOf(project))
      },
      async deleteProject(slug, index) {
        var response = await(api.sendData({}, '/v1/portfolio/projects/' + slug + '/delete/'))
        if (response.success) {
          this.list.splice(index, 1)
          this.$router.push({ path: '/portfolio' })
        } else {
          alert("Error: " + response[0].Error)
        }
      },
      editProject(slug) {
        this.$router.push({ path: '/portfolio/' + slug + '/edit'})
      }

    },
    components: {
      PortfolioProjectIndex,
      PortfolioProject
    }
  }

</script>
