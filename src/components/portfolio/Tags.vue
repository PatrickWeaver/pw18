<template>
  <div>
    <h2 class="page-title">Tags</h2>
    <ul>
      <div v-for="(tag) in pageList" class="tag-list-tag">
        <tag
          :tag="tag"
          :filter="false"
        />
        <object-admin
          v-if="admin"
          @delete="() => deleteTag(tag.slug)"
          @edit="() => editTag(tag.slug)"
        ></object-admin>
      </div>
    </ul>
  </div>
</template>

<script>
  
  /* Components */
  import Tag from './Tag.vue'
  import ObjectAdmin from '../ObjectAdmin.vue'
  
  /* Helpers */
  import api from '../../helpers/api'
  import {editObject} from '../../helpers/general'
  
  export default {
    data() {
      return {
        status: '',
        pages: null,
        perPage: 25,
        pageList: [],
        currentPage: 1
      }
    },
    beforeCreate() {
      this.deleteTag = api.deleteObject.bind(this, 'portfolio', 'tags');
      this.editTag = editObject.bind(this, 'tags');
    },
    created() {
      this.getIndex()
      this.$emit('set-page-title', 'Tags')
    },
    props: [
      'admin'
    ],
    computed: {
    },
    components: {
      Tag,
      ObjectAdmin
    },
    methods: {
      async getIndex() {
        var currentPageListData = await api.getIndexList('portfolio', 'tags', 'tags_list', 'total_tags', this.perPage, this.currentPage, this.admin);
        this.pageList = currentPageListData.pageList
        this.pages = currentPageListData.pages
      }
    }
  }  
</script>

<style>

  .tag-list-tag {
    display: block;
  }

</style>