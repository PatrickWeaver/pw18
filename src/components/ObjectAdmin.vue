<template>

  <div>
    <ul>
      <li><button @click="$emit('edit')">
        Edit
      </button></li>
      <li><button @click="$emit('delete')">
        Delete
      </button></li>
    </ul>
  </div>

</template>

<script>

export default {
  
}
</script>