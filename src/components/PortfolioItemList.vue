<template>
  <div>
    <ul>
      <li v-for="(item, index) in list">
        <h3><a :href=item.slug >{{ item.name }}</a></h3>
        <h4>
          <YearDateRange
            v-bind:startString=item.start_date
            v-bind:endString=item.end_date
          ></YearDateRange>
        </h4>
        <p>{{ item.description }}</p>
        <ul>
          <li>{{ item.status_id }}</li>
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
  
  import UrlWithLabel from './UrlWithLabel.vue'
  import YearDateRange from './YearDateRange.vue'
  
  export default {
    props: [
      'list'
    ],
    components: {
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
