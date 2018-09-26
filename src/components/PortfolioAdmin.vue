<template>

  <div>
    <ul>
      <li><button @click="$emit('edit-project')">
        Edit
      </button></li>
      <li><button @click="$emit('delete-project')">
        Delete
      </button></li>
    </ul>
  </div>

</template>

<script>

export default {
  
}
</script>