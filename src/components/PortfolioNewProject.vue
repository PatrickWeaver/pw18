<template>
  <div>
    <h2>
      New Project
    </h2>

    <form>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Description:</label>
      <textarea v-model="description"></textarea>
      <label>Start Date:</label>
      <input type="date" :value="startDate && startDate.toISOString().split('T')[0]"
                     @input="startDate = $event.target.valueAsDate" />
      <label>End Date:</label>
      <input type="date" :value="endDate && endDate.toISOString().split('T')[0]"
                     @input="endDate = $event.target.valueAsDate" />
      <label>Status Id:</label>
      <input type="number" v-model="statusId" />
      <label>Project URL:</label>
      <input type="text" v-model="projectUrl" />
      <label>Source URL:</label>
      <input type="text" v-model="sourceUrl" />
      <label>Hide Project:</label>
      <input type="checkbox" v-model="isHidden" />
      <button @click.prevent="submitNewProject">Submit</button>
    </form>
    
    <p>
      Start Date: {{ startDate }}
  </p>
    <p>
      End Date: {{ endDate }}
  </p>
    
    
    <h3>
      {{ isHidden }}  
    </h3>
    <h1>
      {{ name }}  
    </h1>
    <h2>
      {{ slug }}
    </h2>
    <p>
      {{ description }} 
    </p>

  
  </div>
</template>

<script>
  
  /* Helpers */
  import api from '../helpers/api'
  
  /* NPM */
  import * as slug from 'slug'
  import * as snake from 'snakecase-keys'
  
  
  export default {
    data() {
      return {
        name: '',
        slug: '',
        autofillSlug: true,
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        // Replace with picker
        statusId: null,
        projectUrl: '',
        sourceUrl: '',
        isHidden: false,
        
      }
    },
    components: {
    },
    computed: {
      autoSlug() {
        return slug(this.name)
      }
    },
    methods: {
      updateSlug: function() {
        if (this.autofillSlug) {
          this.slug = slug(this.name)
        }
      },
      checkForAutofillSlug: function() {
        if (this.slug === slug(this.name)) {
          this.autofillSlug = true
        }
      },
      submitNewProject: async function() {     
        var response = await(api.sendData(snake(this.$data), '/v1/portfolio/projects/new/'))
        if (response.success) {
          this.$router.push({ path: '/portfolio/${response.slug}' })
        } else {
          alert("Error: " + response[0].Error)
        }
      }
    },
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>