<template>
  <div>
    <ul>
      <li v-for="(item, index) in list">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <ul>
          <li>{{ item.start_date }} - {{ item.end_date}}</li>
          <li>{{ item.status_id }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  
  export default {
    props: [
      'list'
    ]
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
