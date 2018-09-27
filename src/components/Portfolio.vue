<template>

  <div>
    <h2>Portfolio</h2>
    <div v-if="activeProjectSlug">
      <portfolio-project
        :admin="admin"
        id="active-project"
        :slug="activeProjectSlug"
        :index-loaded="list.length === 0 ? false : true"
        @filter-by="filterBy"
        @delete-project="findAndDeleteProject"
        @edit-project="editProject"
        @return-to-index="returnToIndex"
      ></portfolio-project>
    </div>
    <div v-else>
      <ul>
        <portfolio-project-index
          v-for="(project, index) in list"
          :admin="admin"
          :key="project.slug"
          :index="index"
          :project="project"
          :hide="filterProject(index)"
          @filter-by="filterBy"
          @activate-project="activateProject"
          @delete="deleteProject"
          @edit="editProject"
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
        list: [],
        filter: null
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
      'activeProjectSlug',
      'admin'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioIndex'
    },
    methods: {
      async getPortfolioIndex() {
        if (!this.activeProjectSlug && this.list.length === 0) {
          var path = '/v1/portfolio/projects/'
          var api_data = await(api.getData(path))
          console.log(api_data)
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
          alert("Error: " + response.error)
        }
      },
      editProject(slug) {
        this.$router.push({ path: '/portfolio/' + slug + '/edit' })
      },
      filterBy(tagSlug) {
        this.$router.push({ path: '/portfolio?filter=' + tagSlug })
      },
      filterProject(index) {
        // Return false to NOT filter out project
        // Return true to filter out project
        var filter = this.$route.query.filter
        if (filter) {
          var status = this.list[index].status.slug
          var tags = this.list[index].tags.map(i => i.slug)
          if (filter === status || tags.indexOf(filter) > -1) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      },
      returnToIndex() {
         this.$router.push({ path: '/portfolio' })
      }

    },
    components: {
      PortfolioProjectIndex,
      PortfolioProject
    }
  }

</script>
