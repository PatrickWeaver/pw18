<script>
  
  export default {
    created() {
      localStorage.removeItem('pw18-api-key')
      this.$emit('logout', response.api_key)
    }
  }

</script>

