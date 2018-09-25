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
    created() {
      if (this.activeProjectSlug) {
        this.getPortfolioProject()
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioProject'
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
      async getPortfolioProject() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.activeProjectSlug ))
        this.name = api_data.project.name
        this.slug = api_data.project.slug
        this.description = api_data.project.description.markdown
        this.startDate = new Date(api_data.project.start_date)
        this.endDate = new Date(api_data.project.end_date)
        this.statusId = api_data.project.status_id
        this.projectUrl = api_data.project.project_url
        this.sourceUrl = api_data.project.source_url
        this.isHidden = api_data.project.is_hidden
      },
      submitNewProject: async function() {
        var path = '/v1/portfolio/projects/new/'
        if (this.activeProjectSlug) {
          path = '/v1/portfolio/projects/' + this.activeProjectSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/portfolio/' + response.slug })
        } else {
          alert("Error: " + response[0].Error)
        }
      }
    },
    props: [
      'activeProjectSlug'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
