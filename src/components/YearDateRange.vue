<template>
  <span v-if="startString || endString">
    
    {{ YearRangeFromDates(startString, endString) }}
  
  </span>
</template>

<script>
  
  export default {
    props: [
      'startString',
      'endString'
    ],
    created() {
    },
    methods: {
      YearRangeFromDates(startString, endString) {
        var startYear = new Date(startString).getFullYear()
        if (!endString) {
          return startYear
        }
        var endYear = new Date(endString).getFullYear()
        if (!startString) {
          return endYear
        }
        if (startYear >= endYear) {
          return startYear
        } else {
          return "" + startYear + " - " + endYear
        }
      }
    }
  }

</script>
