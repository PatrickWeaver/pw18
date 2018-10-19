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
        :filter="filter"
      >
      </pagination>
      <div v-if="filterTag" class="filter-status">
        <h3>Filtered By: </h3>
        <portfolio-tag
          v-if="filterTag"
          @filter-by="filterBy"
          :tag="filterTag"
        ></portfolio-tag>
        <button @click="clearFilter">❌  Remove Filter</button>
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
      ></pagination>
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
  import PortfolioTag from './PortfolioTag.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data: () => {
      return {
        status: '',
        list: [],
        filteredList: [],
        pageList: [],
        pages: 1,
        perPage: 2,
        filter: null,
        filterTag: null
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
      this.onReload()
    },
    props: [
      'activeProjectSlug',
      'activeImageUuid',
      'admin',
      'pageNumber'
    ],
    watch: {
      // call again the method if the route changes
      '$route': 'onReload'
    },
    methods: {
      onReload() {
        this.getPortfolioIndex()
        var loadingMessage = "Loading projects."
        var errorMessage = "Error loading projects."
        setTimeout(() => this.status = loadingMessage, 1 * 1000)
        setTimeout(() => this.status = errorMessage, 10 * 1000)
      },
      async getPortfolioIndex() {
        if (!this.activeProjectSlug) {
          if (this.list.length === 0) {
            var apiData = await(api.getIndex('portfolio', 'projects'))
            this.list = apiData.projects_list
          }

          // Filter projects and set filterTag
          if (this.$route.query.filter) {
            this.filter = this.$route.query.filter
          }
          if (this.filter) {
            this.filteredList = []
            for (var i in this.list) {
              var project = this.list[i]
              if (project.status.slug === this.filter) {
                this.filteredList.push(project)
                this.filterTag = project.status
              } else {
                for (var j in project.tags) {
                  var tag = project.tags[j]
                  if (tag.slug === this.filter) {
                    this.filteredList.push(project)
                    this.filterTag = tag
                    break
                  }
                }
              }
            }
          } else {
            this.filteredList = this.list
          }

          this.pages = Math.ceil(this.filteredList.length/this.perPage)
          var pageStart = (this.currentPage - 1) * this.perPage
          var pageEnd = pageStart + this.perPage
          this.pageList = this.filteredList.slice(pageStart, pageEnd)
        }
      },
      activateProject(slug) {
        this.$router.push({ path: '/portfolio/' + slug })
      },
      clearFilter() {
        this.filteredList = this.list
        this.filter = null
        this.filterTag = null
        this.$router.push({ path: '/portfolio'})
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
      returnToIndex() {
         this.$router.push({ path: '/portfolio' })
      }

    },
    components: {
      PortfolioProjectIndex,
      PortfolioProject,
      Pagination,
      PortfolioTag
    }
  }

</script>

<style>
  .filter-status h3, .filter-status button {
    display: inline-block;
  }

</style>
