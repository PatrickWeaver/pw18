<template>

  <div>
    <h1>Patrick Weaver</h1>
    <TopMenu></TopMenu>
    <router-view></router-view>
  </div>


</template>

<script>
  
  import TopMenu from './TopMenu.vue'
  
  export default {
    data: function () {
      return {}
    },
    components: {
      TopMenu
    }
  }

</script>
