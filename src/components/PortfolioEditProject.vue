<template>
  <div>
    <h2>
      Edit/New Project
    </h2>

    <form>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Short Description:</label>
      <textarea v-model="shortDescription"></textarea>
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

    <ul class="tag-list">
      <li v-for="(tag, index) in tags">
        <portfolio-tag
          :tag="tag"
        ></portfolio-tag>
        <button @click="removeTag(tag.slug)">Remove</button>
      </li>

    </ul>

  </div>
</template>

<script>

  /* Helpers */
  import api from '../helpers/api'

  /* NPM */
  import * as slug from 'slug'
  import * as snake from 'snakecase-keys'

  /* Components */
  import PortfolioTag from './PortfolioTag.vue'


  export default {
    data() {
      return {
        name: '',
        slug: '',
        autofillSlug: true,
        shortDescription: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        statusId: null,
        projectUrl: '',
        sourceUrl: '',
        isHidden: false,
        tags: []

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
      PortfolioTag
    },
    computed: {
      autoSlug() {
        return slug(this.name)
      }
    },
    methods: {
      updateSlug() {
        if (this.autofillSlug) {
          this.slug = slug(this.name)
        }
      },
      checkForAutofillSlug() {
        if (this.slug === slug(this.name)) {
          this.autofillSlug = true
        }
      },
      async getPortfolioProject() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.activeProjectSlug ))
        this.name = api_data.project.name
        this.slug = api_data.project.slug
        this.shortDescription = api_data.project.short_description.markdown
        this.description = api_data.project.description.markdown
        this.startDate = new Date(api_data.project.start_date)
        this.endDate = new Date(api_data.project.end_date)
        this.statusId = api_data.project.status_id
        this.projectUrl = api_data.project.project_url
        this.sourceUrl = api_data.project.source_url
        this.isHidden = api_data.project.is_hidden
        this.tags = api_data.project.tags
      },
      async submitNewProject() {
        var path = '/v1/portfolio/projects/new/'
        if (this.activeProjectSlug) {
          path = '/v1/portfolio/projects/' + this.activeProjectSlug + '/edit/'
        }
        var response = await(api.sendData(snake(this.$data), path))
        if (response.success) {
          console.log(response)
          this.$router.push({ path: '/portfolio/' + response.slug })
        } else {
          alert("Error: " + response.error)
        }
      },
      async removeTag(tagSlug) {
        var path = '/v1/portfolio/projects/' + this.slug + '/remove-tag/'
        var body = {identifier: 'slug', value: tagSlug}
        var response = await(api.sendData(body, path))
        if (response.success) {
          console.log(response)
        } else {
          alert("Error: " + response.error)
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
