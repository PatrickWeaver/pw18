<template>

  <div>
    <h2 class="page-title">Portfolio</h2>
    <!-- if viewing single project -->
    <div v-if="slug">
      <project
        :admin="admin"
        id="active-project"
        :slug="slug"
        :index-loaded="list.length === 0 ? false : true"
        :active-image-uuid="activeImageUuid"
        @filter-by="filterBy"
        @delete="findAndDeleteProject"
        @edit="editProject"
        @set-page-title="passTitleUp"
      />
    </div>
    <div v-else-if="list.length > 0">
      <index
        :pages="pages"
        :filter="filter"
        :go-to-page="goToPage"
        :filter-by="filterBy"
        :filter-tag="filterTag"
        :admin="admin"
        :page-list="pageList"
        :activate-project="activateProject"
        :delete-project="deleteProject"
        :edit-project="editProject"
        :current-page="currentPage"
        @clear-filter="clearFilter"
        @set-page-title="passTitleUp"
      />
    </div>
    <div v-else>
      <img v-if="status" src="/images/clock.gif" class="loading-clock">
      <p>{{ status }}</p> 
    </div>
  </div>

</template>

<script>

  /* Components */
  import Index from './Index.vue'
  import Project from './Project.vue'

  /* Helpers */
  import api from '../../helpers/api'
  import {passTitleUp} from '../../helpers/general'

  export default {
    data: () => {
      return {
        status: '',
        list: [],
        filteredList: [],
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
    beforeCreate() {
      this.passTitleUp = passTitleUp.bind(this)
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.onReload()
    },
    props: [
      'slug',
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
      
      scrollToAnchor() {
        const anchor = this.$router.currentRoute.hash;
        this.$nextTick(() => {
          if (anchor && document.querySelector(anchor)) {
            location.href = anchor
          }
        });
      },
      
      async getPortfolioIndex() {
        if (!this.slug) {
          if (this.list.length === 0) {
            var apiData = await(api.getIndex('portfolio', 'projects', this.admin))
            console.log('API DATA:', apiData)
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
        this.scrollToAnchor()
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
      
      goToPage(pageNumber, filterQs) {
        this.$router.push({ path: '/portfolio/page/' + pageNumber + '/' + filterQs })
      }

    },
    components: {
      Index,
      Project
    }
  }

</script>

<style>
  .filter-status h3, .filter-status button {
    display: inline-block;
  }

</style>
