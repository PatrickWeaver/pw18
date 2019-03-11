<template>

  <div id="app">
    <h6 v-if="admin" id="admin-header">
      Admin
    </h6>
    <a
      id="site-title"
      href="/"
      @click.prevent="index"
    >
      <h1>Patrick Weaver</h1>
    </a>
    <top-menu :admin="admin"></top-menu>
    <router-view
      :admin="admin"
      @login="login"
      @logout="logout"
      @set-page-title="setPageTitle"
    ></router-view>
  </div>


</template>

<script>
  
  import TopMenu from './TopMenu.vue'
  
  import api from '../helpers/api'
  
  const basePageTitle = 'Patrick Weaver'
  
  export default {
    data: function () {
      return {
        admin: false,
        //listType: null,
        //list: [],
        //pageList: []
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
        this.setPageTitle()
      },
      setListType(type) {
        console.log("Page List:", this.pageList);
        if (this.listType != type) {
          this.list = [];
          this.pageList = [];
          this.listType = type;
          //this.$nextTick()
          console.log("Page List 2:", this.pageList);
        }
      },
      async getFromApi(apiCategory, apiObject, apiListName, apiTotalName, pages, perPage, currentPage) {
        if (this.list.length === 0) {
          var apiData = await(api.getIndex(apiCategory, apiObject))
          this.list = apiData[apiListName]
          pages = Math.floor(apiData[apiTotalName]/perPage) + 1
        }
        var pageStart = (currentPage - 1) * perPage
        var pageEnd = pageStart + perPage
        this.pageList = this.list.slice(pageStart, pageEnd)
      },
      setPageTitle(title) {
        document.title = title ? basePageTitle + ' | ' + title : basePageTitle
      }
    }
  }

</script>

<style>
  
  * {
    box-sizing: border-box;
  }

  body {
    padding: 5px;
    background-color: #85fff8;
    font-family: 'Yantramanav', sans-serif;
    font-size: 150%;
    max-width: 900px;
    min-width: 300px;
    margin: 0 auto 1em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  p {
    line-height: 150%;
  }

  pre code {
    display: block;
  }

  img, iframe {
    max-width: 100%;
    height: auto;
  }

  label, input, textarea {
    display: block;
    width: 100%;
    font-size: 125%;
    line-height: 115%;
    padding: 3px;
  }
  
  .text ul {
    list-style-type: disc;
  }

  .text ul, .text ol, .text pre code {
    padding-left: 40px;
    line-height: 150%;
  }

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
  
  .url-with-label, code, pre {
    overflow-wrap: break-word; 
  }
  
  .portfolio-project, .blog-post, .blog-post-preview, .page-blob {
    background-color: #fbfbfb;
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 10px;
  }
  
  img {
    border-radius: 5px;
  }
</style>
