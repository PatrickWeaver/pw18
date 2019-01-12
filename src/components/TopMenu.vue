<template>

  <ul id="menu">
    <li><router-link to="/about">About</router-link></li>
    <li v-if="admin"><router-link to="/upload">Upload</router-link></li>
    <li><router-link to="/portfolio">Portfolio</router-link></li>
    <li v-if="admin"><router-link  to="/portfolio/new">New Project</router-link></li>
    <li><router-link to="/blog">Blog</router-link></li>
    <li v-if="admin"><router-link  to="/blog/new">New Blog Post</router-link></li>
    <li><router-link to="/now">Now</router-link></li>
    <li v-if="admin"><router-link  to="/logout">Log Out</router-link></li>
  </ul>

</template>

<script>
  
  export default {
    data: () => {
      return {}
    },
    props: [
      'admin'
    ]
  }

</script>

<style>
  
  #menu {
    margin: 10px 0;
    display: block;
  }
  
  #menu li {
    background-color: #fbfbfb;
    padding: 5px 10px;
    margin: 5px 5px;
    border-radius: 3px;
    display: inline-block;
  }
  
  #menu a {
    text-decoration: none;
    color: black;
  }
  
  #menu a:hover {
    text-decoration: underline;
  }
  
  #menu a:hover, #menu a:visited, #menu a:active {
    color: black;
  }

</style>
