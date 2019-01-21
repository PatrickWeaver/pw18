<template>
  <div>
    <button @click.prevent="$router.push({ path: '/' })">Cancel</button>
    <button @click.prevent="submit">
      <span v-if="edit">
        Save
      </span>
      <span v-else>
        Submit  
      </span>
    </button>
  </div>
</template>

<script>

export default {
  props: [
    'edit',
    'submit'
  ]
}
  
</script>