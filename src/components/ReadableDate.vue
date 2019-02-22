<template>
  <span v-if="date">
    
    {{ readableDate }}
  
  </span>
</template>

<script>
  
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  
  export default {
    props: [
      'date',
    ],
    computed: {
      readableDate() {
        //console.log(this.date)
        var d = new Date(this.date)
        var year = d.getFullYear()
        var month = months[d.getMonth()]
        var day = d.getDate()
        return `${month} ${day}, ${year}`
      }
    }
  }

</script>
