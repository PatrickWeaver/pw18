<template>
  <div>
    <ul>
      <li v-for="(item, index) in list">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <ul>
          <li>
            <YearDateRange
                v-bind:startString=item.start_date
                v-bind:endString=item.end_date
            >
            </YearDateRange>
          </li>
          <li>{{ item.status_id }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  
  import YearDateRange from './YearDateRange.vue'
  
  export default {
    props: [
      'list'
    ],
    components: {
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
