<template>
  <li class="portfolio-project">   
    <project-header
      :project="project"
      :cover="cover"
      @activate-project="activateProject"
    ></project-header>
    <portfolio-admin
      @delete-project="deleteProject"
      @edit-project="editProject"
    ></portfolio-admin>
  </li>
</template>

<script>
  
  /* Helpers */
  import findPortfolioProjectCover from '../helpers/findPortfolioProjectCover'
  
  /* Components */
  import PortfolioAdmin from './PortfolioAdmin.vue'
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
      'index',
      'project'
    ],
    components: {
      PortfolioAdmin,
      PortfolioImage,
      PortfolioTag,
      ProjectHeader,
      UrlWithLabel,
      YearDateRange
    },
    methods: {
      activateProject(slug) {
        this.$emit('activate-project', slug)
      },
      deleteProject() {
        this.$emit('delete-project', this.project.slug, this.index) 
      },
      editProject() {
        this.$emit('edit-project', this.project.slug) 
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
