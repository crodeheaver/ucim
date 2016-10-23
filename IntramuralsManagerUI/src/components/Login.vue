<template>
<div class="columns">
  <div class="column is-one-third">
  </div>
  <div class="column">
    <div class="card is-fullwidth">
      <header class="card-header">
        <p class="card-header-title title">
          Login
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="control has-icon">
            <input class="input" type="email" placeholder="Email" v-model='email'>
            <i class="fa fa-envelope"></i>
          </p>
          <p class="control has-icon">
            <input class="input" type="password" placeholder="Password" v-model='password'>
            <i class="fa fa-lock"></i>
          </p>

        </div>
      </div>
      <footer class="card-footer">
        <a v-on:click='submit' class="card-footer-item">Submit</a>
      </footer>
    </div>
  </div>
  <div class="column">
  </div>
</div>
</template>

<script>
import store from '../store'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit: function (event) {
      store.actions.login(this.email, this.password)
    }
  }
}
</script>
<style scoped>

</style>
