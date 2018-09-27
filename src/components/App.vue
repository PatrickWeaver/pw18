<template>

  <div>
    <h6 v-if="admin" id="admin-header">
      Admin
    </h6>
    <h1>Patrick Weaver</h1>
    <top-menu></top-menu>
    <router-view
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
  #admin-header {
    margin: 0 10px 10px;
    background-color: #fff;
    padding: 5px;
    text-align: center;
  }
</style>
