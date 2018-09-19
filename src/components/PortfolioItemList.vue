<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" class="portfolio-project">
        
        <h3><a :href="'/portfolio/' + item.slug" >{{ item.name }}</a></h3>
        
        <h4>
          <PortfolioTag v-bind:tag=item.status ></PortfolioTag>
        </h4>
        
        <h4>
          <YearDateRange
            v-bind:startString=item.start_date
            v-bind:endString=item.end_date
          ></YearDateRange>
        </h4>
        
        <ul class="tag-list">
          <li v-for="(tag, index) in item.tags">
            <PortfolioTag v-bind:tag=tag ></PortfolioTag>
          </li>
        </ul>
        <p v-html="item.description.html"></p>
        
        <ul>
          <li>
            <UrlWithLabel
              label="Project"
              v-bind:url=item.project_url
            ></UrlWithLabel>
          </li>
          <li>
            <UrlWithLabel
              label="Source"
              v-bind:url=item.source_url
            ></UrlWithLabel>
          </li>
        </ul>
        
      </li>
    </ul>
  </div>
</template>

<script>
  
  import PortfolioTag from './PortfolioTag.vue'
  import UrlWithLabel from './UrlWithLabel.vue'
  import YearDateRange from './YearDateRange.vue'
  
  export default {
    props: [
      'list'
    ],
    components: {
      PortfolioTag,
      UrlWithLabel,
      YearDateRange
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
