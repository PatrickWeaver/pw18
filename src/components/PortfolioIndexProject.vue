<template>
  <li class="portfolio-project">
    <project-header
      :project="project"
      :cover="cover"
      @filter-by="filterBy"
      @activate-project="activateProject"
    ></project-header>
    <object-admin
      v-if="admin"
      @delete="deleteProject"
      @edit="editProject"
    ></object-admin>
  </li>
</template>

<script>

  /* Helpers */
  import findPortfolioProjectCover from '../helpers/findPortfolioProjectCover'

  /* Components */
  import ObjectAdmin from './ObjectAdmin.vue'
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
      'project',
      'admin'
    ],
    components: {
      ObjectAdmin,
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
        this.$emit('delete', this.project.slug, this.index)
      },
      editProject() {
        this.$emit('edit', this.project.slug)
      },
      filterBy(tagSlug) {
        this.$emit('filter-by', tagSlug)
      }
    }
  }

</script>

<style>

  .portfolio-project {
    margin: 1em 0;
  }

</style>
