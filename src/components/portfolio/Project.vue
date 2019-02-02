<template>
  <div v-if="project" class="portfolio-project">
    <a
      v-if="indexLoaded"
      :href="'/portfolio#' + project.slug"
      @click.prevent="returnToIndex"
    >⇦ Back</a>
    <project-header
      @filter-by="filterBy"
      :project="project"
      :cover="cover"
    />
    
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
      class="description text"
      v-if="project.description"
      v-html="project.description.html"
    ></p>

    <ul class="image-list">
      <li
        v-for="(image) in project.images"
        :key="image.uuid"
      >
        <portfolio-image
          v-bind:image="image"
          :active-image-uuid="activeImageUuid"
          :project-name="project.name"
        />
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
  import api from '../../helpers/api'
  import findPortfolioProjectCover from '../../helpers/findPortfolioProjectCover'

  /* Components */
  import ObjectAdmin from '../ObjectAdmin.vue'
  import ProjectHeader from './ProjectHeader.vue'
  import PortfolioImage from './Image.vue'
  import UrlWithLabel from '../UrlWithLabel.vue'

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
      'indexLoaded',
      'activeImageUuid'
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
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.slug, {}, this.admin))
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
         this.$router.push({ path: '/portfolio#' + this.project.slug })
      }
    },
    components: {
      ObjectAdmin,
      ProjectHeader,
      PortfolioImage,
      UrlWithLabel
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

</style>