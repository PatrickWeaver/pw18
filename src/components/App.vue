<template>

  <div>
    <h6 v-if="admin" id="admin-header">
      Admin
    </h6>
    <h1 id="site-title">Patrick Weaver</h1>
    <top-menu :admin="admin"></top-menu>
    <router-view
      :admin="admin"
      @login="login"
      @logout="logout"
    ></router-view>
  </div>


</template>

<script>
  
  import TopMenu from './TopMenu.vue'
  
  export default {
    data: function () {
      return {
        admin: false
      }
    },
    components: {
      TopMenu
    },
    created() {
      var apiKey = localStorage.getItem('pw18-api-key')
      if (apiKey) {
        this.admin = true
      }
      
      if (this.$router.currentRoute.path === '/') {
        this.$router.push({ path: '/about' })
      }
    },
    methods: {
      login(apiKey) {
        this.admin = true
        localStorage.setItem('pw18-api-key', apiKey);
        this.$router.push({ path: '/' })
      },
      logout() {
        localStorage.removeItem('pw18-api-key')
        this.admin = false
        this.$router.push({ path: '/' })
      }
    }
  }

</script>

<style>
  
  #site-title {
    margin: 0 10px 15px; 
  }
  
  .page-title {
    margin: 1em 10px;
  }
  
  #admin-header {
    margin: 0 10px 10px;
    background-color: #fff;
    padding: 5px;
    text-align: center;
  }
</style>
