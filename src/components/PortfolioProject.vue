<template>
  <div v-if="project" class="portfolio-project">
    <a
      v-if="indexLoaded"
      href="/portfolio"
      @click.prevent="$emit('return-to-index')"
    >⇦ Back</a>
    <project-header
      @filter-by="filterBy"
      :project="project"
      :cover="cover"
    ></project-header>
    
    <ul
      class="link-list"
      v-if="project.project_url || project.source_url"
    >
      <li v-if="project.project_url">
        <url-with-label
          label="Project"
          v-bind:url="project.project_url"
        ></url-with-label>
      </li>
      <li v-if="project.source_url">
        <url-with-label
          label="Source"
          v-bind:url="project.source_url"
        ></url-with-label>
      </li>
    </ul>

    <p
      class="description"
      v-if="project.description"
      v-html="project.description.html"
    ></p>

    <ul class="image-list">
      <li
        v-for="(image, index) in project.images"
      >
        <portfolio-image v-bind:image="image" ></portfolio-image>
      </li>
    </ul>
    <object-admin
      v-if="admin"
      @delete="deleteProject"
      @edit="editProject"
    ></object-admin>
  </div>
</template>

<script>

  /* Helpers */
  import api from '../helpers/api'
  import findPortfolioProjectCover from '../helpers/findPortfolioProjectCover'

  /* Components */
  import ObjectAdmin from './ObjectAdmin.vue'
  import PortfolioImage from './PortfolioImage.vue'
  import PortfolioTag from './PortfolioTag.vue'
  import ProjectHeader from './PortfolioProjectHeader.vue'
  import UrlWithLabel from './UrlWithLabel.vue'
  import YearDateRange from './YearDateRange.vue'

  export default {
    data() {
      return {
        project: null
      }
    },
    computed: {
      cover: function() {
        return findPortfolioProjectCover(this.project.images)
      }
    },
    props: [
      'admin',
      'slug',
      'indexLoaded'
    ],
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getPortfolioProject()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioProject'
    },
    methods: {
      async getPortfolioProject() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.slug ))
        this.project = api_data.project
      },
      deleteProject() {
        this.$emit('delete', this.project)
      },
      editProject() {
        this.$emit('edit', this.project.slug)
      },
      filterBy(tagSlug) {
        this.$emit('filter-by', tagSlug)
      },
      returnToIndex() {
         
      }
    },
    components: {
      ObjectAdmin,
      PortfolioImage,
      PortfolioTag,
      ProjectHeader,
      UrlWithLabel,
      YearDateRange
    }
  }

</script>


<style>
  
  .link-list li {
    margin: 5px;
  }

  .description {
    padding: 0 5px;
  }
  
  .image-list {
    margin: 5px;
  }
  
  .image-list li {
    margin: 5px;
    display: inline-block;
  }
  
  .image-list li img {
    display: block;
    max-height: 200px;
  }

</style>