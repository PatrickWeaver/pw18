<template>
  <div>
    <h2>
      Edit/New Project
    </h2>

    <form>
      <image
        v-if="cover"
        :image="cover"
        :cover="true"
      />
      <button
        @click.prevent="makeOrRemoveCover(cover.uuid, false)"
        v-if="cover"
      >Remove Cover</button>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug" @focus="autofillSlug = false" @blur="checkForAutofillSlug" />
      <label>Short Description:</label>
      <textarea v-model="shortDescription" />
      <label>Description:</label>
      <textarea v-model="description" />
      <label>Start Date:</label>
      <input type="date" :value="startDate && startDate.toISOString().split('T')[0]"
                     @input="startDate = $event.target.valueAsDate" />
      <label>End Date:</label>
      <input type="date" :value="endDate && endDate.toISOString().split('T')[0]"
                     @input="endDate = $event.target.valueAsDate" />
      <label>Status:</label>
      <select v-model="statusId">
        <option disabled value="null">Available Statuses:</option>
        <option v-for="status in availableStatuses" :value="status.id" :key="status.slug">
          {{ status.name }}
        </option>
      </select>
      <label>Project URL:</label>
      <input type="text" v-model="projectUrl" />
      <label>Source URL:</label>
      <input type="text" v-model="sourceUrl" />
      <label>Hide Project:</label>
      <input type="checkbox" v-model="isHidden" />
      <button @click.prevent="$router.push({ path: '/' })">Cancel</button>
      <button @click.prevent="submitNewProject">Submit</button>
    </form>

    <div v-if="activeProjectSlug">
      <hr>

      <select id="tag-selector" name="new-tags" v-model="newTag">
        <option disabled value="null">Available Tags:</option>
        <option v-for="tag in availableTags" :value="tag" :key="tag.slug">
          {{ tag.name }}
        </option>
      </select>

      <button
        @click.prevent="addRemoveTag(newTag.slug, tags.length, 'add')"
      >
        Add Tag
      </button>
    </div>


    <div v-if="tags.length > 0">
      <hr/>
      <ul class="tag-list">
        <li
          v-for="(tag, index) in tags"
          :key="tag.slug"
        >
          <tag
            :tag="tag"
          />
          <button @click="addRemoveTag(tag.slug, index, 'remove')">Remove</button>
        </li>
      </ul>
    </div>

    <div v-if="activeProjectSlug">
      <hr>

      <form id="new-image-form">
        <label>Image URL:</label>
        <input type="text" v-model="newImageUrl">
        <label>Order:</label>
        <input type="number" v-model="newImageOrder">
        <label>Alt Text:</label>
        <textarea v-model="newImageAltText" />
        <label>Caption:</label>
        <textarea v-model="newImageCaption" />
        <label>Cover Image?</label>
        <input type="checkbox" v-model="newImageCover" />
        <button @click.prevent="addImage(newImageUrl)">Add Image</button>
      </form>
    </div>

    <div v-if="images.length > 0">
      <hr/>
      <ul class="image-list">
        <li
          v-for="(image, index) in images"
          :key="image.uuid"
        >
          <portfolio-image
            v-bind:image="image"
            :active-image-uuid="false"
            :project-name="name"
          />
          <button
            @click="makeOrRemoveCover(image.uuid, true)"
            v-if="!image.cover"
          >Make Cover</button>
          <button @click="deleteImage(image.uuid, index, 'delete')">Delete</button>
        </li>
      </ul> 
    </div>

  </div>
</template>

<script>

  /* Helpers */
  import api from '../../helpers/api'
  import findPortfolioProjectCover from '../../helpers/findPortfolioProjectCover'
  import {updateSlug} from '../../helpers/general'

  /* NPM */
  import * as slug from 'slug'
  import * as snake from 'snakecase-keys'

  /* Components */
  import Tag from './Tag.vue'
  import PortfolioImage from './Image.vue'


  export default {
    data() {
      return {
        name: '',
        projectId: '',
        slug: '',
        autofillSlug: true,
        shortDescription: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        availableStatuses: [],
        statusId: null,
        projectUrl: '',
        sourceUrl: '',
        isHidden: false,
        availableTags: [],
        newTag: null,
        tags: [],
        images: [],
        newImageUrl: null,
        newImageOrder: 0,
        newImageAltText: null,
        newImageCaption: null,
        newImageCover: false

      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this);
    },
    created() {
      if (this.activeProjectSlug) {
        this.getPortfolioProject()
      }
      this.getAndSortTags()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getPortfolioProject'
    },
    components: {
      Tag,
      PortfolioImage
    },
    computed: {
      autoSlug() {
        return slug(this.name)
      },
      cover: function() {
        return findPortfolioProjectCover(this.images)
      }
    },
    methods: {
      checkForAutofillSlug() {
        if (this.slug === slug(this.name)) {
          this.autofillSlug = true
        }
      },
      async getPortfolioProject() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.activeProjectSlug))
        this.name = api_data.project.name
        this.projectId = api_data.project.id
        this.slug = api_data.project.slug
        this.currentSlug = api_data.project.slug
        this.shortDescription = api_data.project.short_description
        this.description = api_data.project.description.markdown
        this.startDate = api_data.project.start_date ? new Date(api_data.project.start_date) : null
        this.endDate = api_data.project.end_date ? new Date(api_data.project.end_date) : null
        this.statusId = api_data.project.status_id
        this.projectUrl = api_data.project.project_url
        this.sourceUrl = api_data.project.source_url
        this.isHidden = api_data.project.is_hidden
        this.tags = api_data.project.tags
        this.images = api_data.project.images
        this.newImageOrder = api_data.project.images.length
      },
      async getAndSortTags() {
        var tags_list = await(api.getTags(this.admin))
        for (var i in tags_list) {
          var t = tags_list[i];
          if (t.status) {
            this.availableStatuses.push(t)
          } else {
            this.availableTags.push(t)
          }
        }
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
      async addRemoveTag(tagSlug, tagIndex, action) {
        if (action === 'remove') {
          this.tags.splice(tagIndex, 1)
        } else {
          this.tags.splice(tagIndex, 0, this.newTag)
          this.newTag = null
        }
        var path = '/v1/portfolio/projects/' + this.currentSlug + '/' + action + '-tag/'
        var body = {identifier: 'slug', value: tagSlug}
        var response = await(api.sendData(body, path))
        if (response.success) {
          console.log(response)
        } else {
          alert("Error: " + response.error)
        }
      },
      async addImage(url) {
        var path = '/v1/portfolio/images/new/'
        var body = {
          url: url,
          project_id: this.projectId,
          order: this.newImageOrder,
          alt_text: this.newImageAltText,
          caption: this.newImageCaption,
          cover: this.newImageCover
        }
        var response = await(api.sendData(body, path))
        if (response.success) {
          this.getPortfolioProject()
          this.newImageUrl = ''
          this.newImageAltText = ''
          this.newImgaeCaption = ''
        } else {
          alert("Error: " + response.error)
        }
      },
      async makeOrRemoveCover(uuid, coverStatus) {
        var path = '/v1/portfolio/images/' + uuid + '/edit/'
        var body = {
          cover: coverStatus
        }
        var response = await(api.sendData(body, path))
        if (response.success) {
          this.getPortfolioProject()
          console.log(response)
        } else {
          alert("Error: " + response.error)
        }
      },
      async deleteImage(imageUuid, imageIndex, action) {
        this.images.splice(imageIndex, 1)
        this.newImageOrder = this.images.length
        var path = '/v1/portfolio/images/' + imageUuid + '/' + action + '/'
        var response = await(api.sendData({}, path))
        if (response.success) {
          console.log(response)
        } else {
          alert("Error: " + response.error)
        }
      }
    },
    props: [
      'activeProjectSlug',
      'admin'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
