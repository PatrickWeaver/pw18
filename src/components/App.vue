<template>

  <div id="app">
    <h6 v-if="admin" id="admin-header">
      Admin
    </h6>
    <a
      id="site-title"
      href="'/'"
      @click.prevent="index"
    >
      <h1>Patrick Weaver</h1>
    </a>
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
      this.refresh()
    },
    watch: {
      '$route': 'refresh'
    },
    methods: {
      index() {
        this.$router.push({ path: '/' })
      },
      login(apiKey) {
        this.admin = true
        localStorage.setItem('pw18-api-key', apiKey);
        this.$router.push({ path: '/' })
      },
      logout() {
        localStorage.removeItem('pw18-api-key')
        this.admin = false
        this.$router.push({ path: '/' })
      },
      refresh() {
        var apiKey = localStorage.getItem('pw18-api-key')
        if (apiKey) {
          this.admin = true
        }
        
        if (this.$router.currentRoute.path === '/') {
          this.$router.push({ path: '/about' })
        }
      }
    }
  }

</script>

<style>

  #site-title {
    text-decoration: none;
    color: #000000;
  }
  
  #site-title h1 {
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
