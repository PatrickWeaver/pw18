<template>

  <div>
    <router-link v-if="admin" to="/upload">Upload</router-link>
    <router-link to="/portfolio">Portfolio</router-link>
    <router-link v-if="admin" to="/portfolio/new">New Project</router-link>
    <router-link to="/blog">Blog</router-link>
    <router-link v-if="admin" to="/blog/new">New Blog Post</router-link>
    <router-link v-if="admin" to="/logout">Log Out</router-link>
  </div>

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
