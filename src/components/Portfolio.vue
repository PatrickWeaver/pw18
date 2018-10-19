<template>

  <div>
    <h2 class="page-title">Portfolio</h2>
    <div v-if="activeProjectSlug">
      <portfolio-project
        :admin="admin"
        id="active-project"
        :slug="activeProjectSlug"
        :index-loaded="list.length === 0 ? false : true"
        :active-image-uuid="activeImageUuid"
        @filter-by="filterBy"
        @delete="findAndDeleteProject"
        @edit="editProject"
        @return-to-index="returnToIndex"
      ></portfolio-project>
    </div>
    <div v-else-if="list.length > 0">
      <pagination
        v-if="pageNumber > 1"
        :pages="pages"
        :pageNumber="currentPage"
        :section="'portfolio'"
      >
      </pagination>
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
      <pagination :pages="pages" :pageNumber="currentPage" :section="'portfolio'"></pagination>
    </div>
    <div v-else>
      <p>{{ status }}</p> 
    </div>
  </div>

</template>

<script>

  /* Components */
  import PortfolioProjectIndex from './PortfolioProjectIndex.vue'
  import PortfolioProject from './PortfolioProject.vue'
  import Pagination from './Pagination.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data: () => {
      return {
        status: '',
        list: [],
        pages: 1,
        filter: null
      }
    },
    computed: {
      currentPage() {
        return this.pageNumber ? this.pageNumber : 1
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getPortfolioIndex()
      var loadingMessage = "Loading projects."
      var errorMessage = "Error loading projects."
      setTimeout(() => this.status = loadingMessage, 1 * 1000)
      setTimeout(() => this.status = errorMessage, 10 * 1000)
    },
    props: [
      'activeProjectSlug',
      'activeImageUuid',
      'admin',
      'pageNumber'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioIndex'
    },
    methods: {
      async getPortfolioIndex() {
        if (!this.activeProjectSlug && this.list.length === 0) {
          var per_page = 5
          var path = '/v1/portfolio/projects/'
          var qs = {
            quantity: per_page
          }
          if (this.pageNumber) {
            qs['page'] = this.pageNumber
          }
          var api_data = await(api.getData(path, '', qs))
          console.log(api_data)
          this.list = api_data.projects_list
          this.pages = Math.floor(api_data.total_projects/per_page) + 1
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
      PortfolioProject,
      Pagination
    }
  }

</script>

<style>

</style>
