<template>
  <div id="new-tag">
    <h4>
      Add new Tag: {{ projectSlug }}
    </h4>
    <form>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug"/>
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Color:</label>
      <input type="color" v-model="color" disabled/>
      <label>Status:</label>
      <input type="checkbox" v-model="status" />
      <button type="submit" @click.prevent="addTag">
        Submit  
      </button>
    </form>
  </div>
</template>


<script>
  
  import api from '../helpers/api'
  import * as slug from 'slug'
  
  export default {
    data() {
      return {
        name: '',
        slug: '',
        autofillSlug: true,
        color: null,
        status: false,
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
      async addTag() {
        var path = '/v1/portfolio/tags/new/'
        var body = {
          name: this.name,
          slug: this.slug,
          color: this.color,
          status: this.status,
        }
        var response = await(api.sendData(body, path))
        console.log("** RESPONSE **")
        console.log(response)
        if (response.success) {
          this.$emit('add-created-tag', response)
          this.name = ''
          this.slug = ''
          this.color = ''
          this.status= false
        } else {
          alert("Error: " + response.error)
        }
      }
      
    },
    props: [
      'projectSlug'
    ],
    
  }

</script>

<style scoped>

  #new-tag {
    margin-bottom: 3em;
  }


</style>

