<template>
 <div id="wrapper">
    <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"><strong>Djackets</strong></router-link>

      <a class="navbar-burger " aria-label="menu" aria-expanded="false" data-target="navbar-menu" href="" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
      </a>   
    </div>  

    <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
      <div class="navbar-start">
        <div class="navbar-item">
          <form  method="get" action="/search">
            <div class="field has-addons"> 
            <div class="control">
              <input type="text" class="input" placeholder="What are you looking for?" name="query" id="">
            </div>
 
            <div class="control">
              <button class="button is-success">
                <span class="icon">
                  <i class="fas fa-search"></i>
                </span>
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
       
      
      <div class="navbar-end">
        <router-link to="/summer" class="navbar-item">Summer</router-link>
        <router-link to="/winter" class="navbar-item">Winter</router-link>

        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="button is-light">My account</router-link>
            </template>

            <template v-else>
              <router-link to="/log-in" class="button is-light">Log in</router-link>
            </template>
            <router-link to="/cart" class="button is-success">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>

      </div>
    </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading':$store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2025</p>
    </footer>
   </div> 
</template>

<script>
import axios from 'axios'

export default{
  data() {
    return {
      showMobileMenu: false,
      cart:{
        items:[]
      }
    }
  },
  beforeCreate(){
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if(token) {
      axios.defaults.headers.common['Authorization'] = "Token" +token
    }else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },

  mounted() {
     this.cart = this.$store.state.cart
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0

      for (let i=0; i < this.cart.items.length; i++){
        totalLength += this.cart.items[i].quantity
      }
      return totalLength
    }
  }
}
</script>
<style lang="scss">
@import '../node_modules/bulma';


</style> 