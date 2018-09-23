<template>
  <div v-if="project" class="portfolio-project">
    
    <ProjectHeader :project="project" :cover="cover" ></ProjectHeader>
    
    <p v-if="project.description" v-html="project.description.html"></p>

    <ul>
      <li>
        <UrlWithLabel
          label="Project"
          v-bind:url=project.project_url
        ></UrlWithLabel>
      </li>
      <li>
        <UrlWithLabel
          label="Source"
          v-bind:url=project.source_url
        ></UrlWithLabel>
      </li>
    </ul>

    <ul class="image-list">
      <li v-for="(image, index) in project.images">
        <PortfolioImage v-bind:image=image ></PortfolioImage>
      </li>
    </ul>
  </div>
</template>

<script>
  
  /* Helpers */
  import api from '../helpers/api'
  import findPortfolioProjectCover from '../helpers/findPortfolioProjectCover'
  
  /* Components */
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
      'slug'
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
      }
    },
    components: {
      PortfolioImage,
      PortfolioTag,
      ProjectHeader,
      UrlWithLabel,
      YearDateRange
    }
  }  

</script>
