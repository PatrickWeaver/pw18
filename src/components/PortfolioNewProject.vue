<template>
  <div>
    <h2>
      New Project
    </h2>

    <form>
      <label>Name:</label>
      <input type="text" v-model="name" @change="updateSlug" />
      <label>Slug:</label>
      <input type="text" v-model="slug"   @focus="autofillSlug = false" @blur="checkForAutofillSlug"/>
      <label>Description:</label>
      <textarea v-model="description"></textarea>
    </form>
    
    <h1>
      {{ name }}  
    </h1>
    <h2>
      {{ slug }}
    </h2>
    <p>
      {{ description }} 
    </p>
  



  <!--
    name = models.CharField(max_length=1024)
    slug = models.CharField(max_length=1024, unique=True, blank=True)
    description = models.TextField(default='', blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    sort_date = models.DateTimeField(blank=True)
    status = models.ForeignKey(Tag, related_name='project_status', on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, related_name='project_tags')
    project_url = models.CharField(max_length=1024, blank=True, null=True)
    source_url = models.CharField(max_length=1024, blank=True, null=True)
    is_hidden = models.BooleanField(default=False, blank=False)
    created_date = models.DateTimeField(default=timezone.now, blank=True)
  -->
  </div>
</template>

<script>
  
  import * as slug from 'slug'

  export default {
    data() {
      return {
        name: '',
        slug: '',
        autofillSlug: true,
        description: '',
      }
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
      }
    },
    watch: {
      autoSlug() {
        this.updateSlug()
      }
    }
  }

</script>