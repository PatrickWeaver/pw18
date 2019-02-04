<template>
  <div v-if="cover">
    <!-- Cover image --> 
    <img :src="image.url">
  </div>
  <div v-else-if="active">
    <!-- Active image -->
    <div class="active-image-container">
      <div
        class="close-active-image"
      >
        <span class="project-name-header">
          {{ projectName }}
        </span><!--
     --><a
          :href="projectPath"
          class="close-link"
          @click.prevent="closeActiveImage"
        >
          ❌ Close
        </a>
      </div>
      <img
        :src="image.url"
        class="active-image"
        :alt="image.alt_text"
      >
      <p class="gallery-image-caption">{{ image.caption }}</p>
    </div>
  </div>
  <div v-else>
    <!-- Image gallery -->
    <a
      :href="this.$router.currentRoute.path + '/' + image.uuid"
      @click.prevent="loadImage"
    >
      <img
        class="gallery-image"
        :src="image.url"
        :alt="image.alt_text"
      >
    </a>
    <p class="gallery-image-caption">{{ image.caption }}</p>
  </div>
  

</template>

<script>

  
  export default {
    data() {
      return {
        active: false
      }
    },
    computed: {
      isActiveImage() {
        return this.activeImageUuid === this.image.uuid 
      },
      projectPath() {
        return '/portfolio/' + this.$route.params.activeProjectSlug
      }
    },
    created() {
      this.checkActiveImage()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'checkActiveImage'
    },
    props: [
      'image',
      'cover',
      'activeImageUuid',
      'projectName'
    ],
    components: {
    },
    methods: {
      checkActiveImage() {
        var appElement = document.getElementById('app')
        if (this.isActiveImage) {
          this.active = true
          this.oneActive = true

          appElement.style.overflow = 'hidden'
          return true
        } else {
          appElement.style.overflow = 'auto'
          this.active = false;
          return false
        }
      },
      loadImage() {
        this.$router.push({
          name: 'portfolio-project-image',
          params: {
            activeProjectSlug: this.$route.params.activeProjectSlug,
            activeImageUuid: this.image.uuid
          }
        })
        document.documentElement.style.overflow = 'hidden'
        this.active = true
      },
      closeActiveImage() {   
        this.$router.push({
          name: 'portfolio-project',
          params: {
            activeProjectSlug: this.$route.params.activeProjectSlug
          }
        })
        document.documentElement.style.overflow = 'auto'
        this.active = false
        this.oneActive = false
      }
    }
  }  

</script>


<style>

  .active-image-container {
    position: fixed;
    background-color: #fdfdfd;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  
  .active-image {
    margin: 2.5em auto 1em;
    display: block;
  }
  
  .close-active-image {
    font-size: 115%;
    position: fixed;
    width: 100%;
    background-color: rgba(253, 253, 253, 0.8);
  }
  
  .project-name-header {
    text-align: left;
    width: 50%;
    display: inline-block;
    padding: 5px;
  }
  
  .close-link {
    cursor: pointer;
    text-decoration: none;
    color: black;
    text-align: right;
    width: 50%;
    display: inline-block;
    padding: 5px;
  }
  
  .gallery-image {
    display: block;
    max-height: 200px;
  }

</style>