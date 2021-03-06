<template>
  <div>
    <h2>
      Edit/New Project
    </h2>

    <form>
      <portfolio-image
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
      <edit-form-buttons
        :edit="currentSlug"
        :submit="submitNewProject"
      />
    </form>

    <div v-if="currentSlug">
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

    <div v-if="currentSlug">
      
      <hr>
      
      <new-image
        :api-object="apiObject"
        @status="newImageStatus"
      />

    </div>

    <div v-if="images.length > 0">
      <hr/>
      <ol class="image-list">
        <li
          v-for="(image, index) in images"
          :key="image.uuid"
        >
          <portfolio-image
            v-bind:image="image"
            :active-image-uuid="false"
            :project-name="name"
            show-order="true"
          />
          <button
            @click="makeOrRemoveCover(image.uuid, true)"
            v-if="!image.cover"
          >Make Cover</button>
          <object-admin
            v-if="admin"
            @delete="deleteImage(image.uuid, index, 'delete')"
            @edit="editImage('portfolio/' + slug, image.uuid)"
          ></object-admin>
        </li>
      </ol> 
    </div>

  </div>
</template>

<script>

  /* Helpers */
  import api from '../../helpers/api'
  import findPortfolioProjectCover from '../../helpers/findPortfolioProjectCover'
  import {updateSlug} from '../../helpers/general'
  import {resetFields} from '../../helpers/general'
  import {slug} from '../../helpers/general'
  import {editObject} from '../../helpers/general'

  /* NPM */
  import * as snake from 'snakecase-keys'

  /* Components */
  import Tag from './Tag.vue'
  import PortfolioImage from './Image.vue'
  import NewImage from '../EditImage.vue'
  import EditFormButtons from '../EditFormButtons.vue'
  import ObjectAdmin from '../ObjectAdmin.vue'


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
        images: []
      }
    },
    beforeCreate() {
      this.updateSlug = updateSlug.bind(this)
      this.resetFields = resetFields.bind(this)
      this.editImage = editObject.bind(this)
    },
    created() {
      if (this.currentSlug) {
        this.getPortfolioProject()
        this.autofillSlug = false
      } else {
        this.$emit('set-page-title','New Project')
      }
      this.getAndSortTags()
    },
    beforeRouteLeave(to, from, next) {
      this.resetFields()
      next()
    },
    components: {
      Tag,
      PortfolioImage,
      NewImage,
      EditFormButtons,
      ObjectAdmin
    },
    computed: {
      autoSlug() {
        return slug(this.name)
      },
      cover: function() {
        return findPortfolioProjectCover(this.images)
      },
      apiObject() {
        return {project_id: this.projectId}
      }
    },
    methods: {
      checkForAutofillSlug() {
        if (this.slug === slug(this.name) && !this.currentSlug) {
          this.autofillSlug = true
        }
      },
      newImageStatus(status) {
        if (status) {
          console.log("Success!")
          this.getPortfolioProject()
        } else {
          console.log("FAILED");
        }
      },
      async getPortfolioProject() {
        var api_data = await(api.getData('/v1/portfolio/projects/' + this.currentSlug, null, this.admin))
        var project = api_data.project
        console.log("PROJECT:", api_data)
        this.name = project.name
        this.projectId = project.id
        this.slug = project.slug
        this.currentSlug = project.slug
        this.shortDescription = project.short_description
        this.description = project.description.markdown
        this.startDate = project.start_date ? new Date(project.start_date) : null
        this.endDate = project.end_date ? new Date(project.end_date) : null
        this.statusId = project.status_id
        this.projectUrl = project.project_url
        this.sourceUrl = project.source_url
        this.isHidden = project.is_hidden
        this.tags = project.tags
        this.images = project.images
        this.newImageOrder = project.images.length
        this.$emit('set-page-title', 'Edit: ' + project.name)
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
        /* Explicit error message because this is a common mistake */
        if (!this.statusId) {
          alert("Cannot submit project without status")
          return
        }
        
        var path = '/v1/portfolio/projects/new/'
        if (this.currentSlug) {
          path = '/v1/portfolio/projects/' + this.currentSlug + '/edit/'
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
      'currentSlug',
      'admin'
    ],
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>
