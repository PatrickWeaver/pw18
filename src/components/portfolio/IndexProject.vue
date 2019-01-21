<template>
  <li class="portfolio-project">
    <project-header
      :project="project"
      :cover="cover"
      @filter-by="filterBy"
      @activate-project="activateProject"
    />
    <object-admin
      v-if="admin"
      @delete="deleteProject"
      @edit="editProject"
    />
  </li>
</template>

<script>

  /* Helpers */
  import findPortfolioProjectCover from '../../helpers/findPortfolioProjectCover'

  /* Components */
  import ObjectAdmin from '../ObjectAdmin.vue'
  import ProjectHeader from './ProjectHeader.vue'

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
      ProjectHeader
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
