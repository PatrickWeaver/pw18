<template>
  <div v-if="project" class="project-header">
    <h3 class="project-name">
      <a
        @click.prevent="activateProject"
        :href="'/portfolio/' + project.slug"
        :id="project.slug"
      >
        {{ project.name }}
      </a>
    </h3>

    <a
      @click.prevent="activateProject"
      :href="'/portfolio/' + project.slug"
      class="cover"
    >
      <portfolio-image
        v-if="cover"
        :image="cover"
        :cover="true"
      ></portfolio-image>
    </a>

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

    <ul
      class="project-tag-list"
      v-if="project.tags.length > 0"
    >
      <li
        v-for="(tag) in project.tags"
        :key="tag.slug"
      >
        <portfolio-tag
          @filter-by="filterBy"
          :tag="tag"
        ></portfolio-tag>
      </li>
    </ul>
    <p
       class="project-short-description"
       v-if="project.short_description"
    >
      {{ project.short_description }}  
    </p>
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
    grid-template-columns: Calc(50% - 10px) Calc(50% - 10px);
    column-gap: 20px;
    grid-template-rows: repeat( auto-fit 1em);
  }
  
  .project-name {
    margin-top: 0;
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  
  .project-name a {
    color: #000;
    text-decoration: none;
  }
  
  .project-name a:hover {
    text-decoration: underline;
  }

  .cover {
    grid-column-start: 2;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: 7;
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
    margin: .5em 5px;
    color: #333;
  }

  .project-tag-list {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 4;
    grid-row-end: 5;
  }

  .project-tag-list li {
    display: inline-block;
  }
  
  .project-short-description {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 5;
    grid-row-end: 6;
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
      margin: 0 0 20px;
    }

    .status-tag {
      grid-row-start: 3;
      grid-row-end: 4;
    }

    .project-date-range {
      grid-row-start: 4;
      grid-row-end: 5;
      margin: .5em 5px;
      font-weight: normal;
    }

    .project-tag-list {
      grid-row-start: 5;
      grid-row-end: 6;
    }
    
    .project-short-description {
      grid-row-start: 6;
      grid-row-end: 7;
    }
  }

</style>
