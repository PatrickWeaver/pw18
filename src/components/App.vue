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
    methods: {
      login(apiKey) {
        this.admin = true
        localStorage.setItem('pw18-api-key', apiKey);
        this.$router.push({ path: '/' })
      },
      logout() {
        alert("LOGOUT!")
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
