<template>
  <div v-if="project">
    <h3><a @click.prevent="activateProject" :href="'/portfolio/' + project.slug" >{{ project.name }}</a></h3>

    <portfolio-image v-if="cover" :image="cover" ></portfolio-image>
    
    <h4>
      <portfolio-tag :tag="project.status" ></portfolio-tag>
    </h4>

    <h4>
      <year-date-range
        :start-string="project.start_date"
        :end-string="project.end_date"
      ></year-date-range>
    </h4>

    <ul class="tag-list">
      <li v-for="(tag, index) in project.tags">
        <portfolio-tag v-bind:tag="tag" ></portfolio-tag>
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
      }
    }
  }  

</script>
