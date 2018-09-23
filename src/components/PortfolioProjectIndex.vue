<template>
  <li class="portfolio-project">   
    <ProjectHeader :project="project" :cover="cover" @activate-project="activateProject"></ProjectHeader>
    
  </li>
</template>

<script>
  
  /* Helpers */
  import findPortfolioProjectCover from '../helpers/findPortfolioProjectCover'
  
  /* Components */
  import PortfolioImage from './PortfolioImage.vue'
  import PortfolioTag from './PortfolioTag.vue'
  import ProjectHeader from './PortfolioProjectHeader.vue'
  import UrlWithLabel from './UrlWithLabel.vue'
  import YearDateRange from './YearDateRange.vue'
  
  export default {
    computed: {
      cover: function() {
        return findPortfolioProjectCover(this.project.images)
      }
    },
    props: [
      'project'
    ],
    components: {
      PortfolioImage,
      PortfolioTag,
      ProjectHeader,
      UrlWithLabel,
      YearDateRange
    },
    methods: {
      activateProject(slug) {
        this.$emit('activate-project', slug)
      }
    }
  }
  /*
  export default {
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }
  */
  

</script>
