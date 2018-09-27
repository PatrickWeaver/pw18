<template>
  <div v-if="project" class="project-header">
    <h3 class="project-name">
      <a @click.prevent="activateProject" :href="'/portfolio/' + project.slug" >
        {{ project.name }}
      </a>
    </h3>

    <portfolio-image v-if="cover" :image="cover" class="cover"></portfolio-image>

    <portfolio-tag
      class="status-tag"
      @filter-by="filterBy"
      :tag="project.status"
    ></portfolio-tag>

    <h4 class="project-date-range">
      <year-date-range
        :start-string="project.start_date"
        :end-string="project.end_date"
      ></year-date-range>
    </h4>

    <ul class="project-tag-list">
      <li v-for="(tag, index) in project.tags">
        <portfolio-tag
          @filter-by="filterBy"
          :tag="tag"
        ></portfolio-tag>
      </li>
    </ul>

  </div>
</template>

<script>

  /* Helpers */
  import api from '../helpers/api'

  /* Components */
  import PortfolioImage from './PortfolioImage.vue'
  import PortfolioTag from './PortfolioTag.vue'
  import UrlWithLabel from './UrlWithLabel.vue'
  import YearDateRange from './YearDateRange.vue'

  export default {
    data() {
      return {
      }
    },
    props: [
      'project',
      'cover'
    ],
    components: {
      PortfolioImage,
      PortfolioTag,
      UrlWithLabel,
      YearDateRange
    },
    methods: {
      activateProject (event) {
        this.$emit('activate-project', this.project.slug)
      },
      filterBy (tagSlug) {
        this.$emit('filter-by', tagSlug)
      }

    }
  }

</script>


<style>
  .project-header {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 20px 10px;
  }
  
  .project-name {
    margin-top: 0;
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .cover {
    grid-column-start: 2;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: 5;
    margin: 0 auto 20px;
  }
  
  .cover img {
    max-height: 400px;
  }

  .status-tag {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .project-date-range {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .project-tag-list {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 4;
    grid-row-end: 5;
  }

  .project-tag-list li {
    display: inline-block;
    margin: 5px;
  }
  
  @media (max-width: 768px) { 
  
    .project-header {
      grid-template-columns: 100%;
    }

    .cover {
      grid-column-start: 1;
      grid-column-end: span 1;
      grid-row-start: 2;
      grid-row-end: 3;
    }

    .status-tag {
      grid-row-start: 3;
      grid-row-end: 4;
    }

    .project-date-range {
      grid-row-start: 4;
      grid-row-end: 5;
    }

    .project-tag-list {
      grid-row-start: 5;
      grid-row-end: 6;
    }
  }

</style>
