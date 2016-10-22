<template>
  <div class='app'>
    <header>
      <nav class='nav'>
        <div class='nav-right nav-menu'>
          <router-link class='nav-item' to="/players">Players</router-link>
          <router-link class='nav-item' to="/teams">Teams</router-link>
          <router-link class='nav-item' to="/games">Games</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
  header
    padding-bottom: 3em

  $fa-font-path: "../../node_modules/font-awesome/fonts" !default
  @import '../../node_modules/font-awesome/scss/font-awesome.scss'
  @import '../../node_modules/bulma/bulma.sass'
</style>
