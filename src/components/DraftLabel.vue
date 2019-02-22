<template>
<h4 class="draft-label">
  {{text}} 
</h4>
</template>

<script>

  export default {
    data() {
      return {}
    },
    props: [
      'text'
    ]
  } 


</script>

<style>

.draft-label {
  color: #FF7F7F;
  border: 3px solid #FF7F7F;
  text-align: center;
  padding: .25em;
}

</style>