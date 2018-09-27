<template>

  <div>
    <form>
      <label>Username:</label>
      <input type="text" v-model="username" />
      <label>Password:</label>
      <input type="password" v-model="password" />
      <button @click.prevent="submitLogin">
        Submit
      </button>
    </form>
  </div>

</template>


<script>
  
  /* Helpers */
  import api from '../helpers/api'
  
  export default {
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async submitLogin() {
        var path = '/v1/people/authenticate/'
        var body = {username: this.username, password: this.password}
        var response = await(api.sendData(body, path))
        if (response.success) {
          console.log(response)
          this.$emit('login', response.api_key)
        } else {
          alert("Error: " + response.Error)
        }
    
      }
    }
  }

</script>


<style>

</style>
