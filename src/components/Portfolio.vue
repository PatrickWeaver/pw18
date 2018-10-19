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
      <div v-if="filterTag" class="filter-status">
        <h3>Filtered By: </h3>
        <portfolio-tag
          v-if="filterTag"
          @filter-by="filterBy"
          :tag="filterTag"
        ></portfolio-tag>
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
  import PortfolioTag from './PortfolioTag.vue'

  /* Helpers */
  import api from '../helpers/api'

  export default {
    data: () => {
      return {
        status: '',
        list: [],
        pageList: [],
        pages: 1,
        perPage: 5,
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
        this.getFilterTag()
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
            this.pages = Math.floor(apiData.total_projects/this.perPage) + 1
          }
          var pageStart = (this.currentPage - 1) * this.perPage
          var pageEnd = pageStart + this.perPage
          this.pageList = this.list.slice(pageStart, pageEnd)
        }
      },
      async getFilterTag() {
        this.filterTag = null
        if (this.$route.query.filter) {
          this.filter = this.$route.query.filter
        }
        var getStatus = false
        var tags_list = await(api.getTags(this.admin, getStatus))
        for (var i in tags_list) {
          var tag = tags_list[i]
          if (tag.slug === this.filter) {
            this.filterTag = tag
            break
          }
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
  .filter-status h3 {
    display: inline-block;
  }
</style>
