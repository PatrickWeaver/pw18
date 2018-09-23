<template>
  <div v-if="project">
    <h3><a @click.prevent="activateProject" :href="'/portfolio/' + project.slug" >{{ project.name }}</a></h3>

    <PortfolioImage v-if="cover" v-bind:image=cover ></PortfolioImage>
    
    <h4>
      <PortfolioTag v-bind:tag=project.status ></PortfolioTag>
    </h4>

    <h4>
      <YearDateRange
        v-bind:startString=project.start_date
        v-bind:endString=project.end_date
      ></YearDateRange>
    </h4>

    <ul class="tag-list">
      <li v-for="(tag, index) in project.tags">
        <PortfolioTag v-bind:tag=tag ></PortfolioTag>
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
        this.$emit('activate-project', this.project)
      }
    }
  }  

</script>
