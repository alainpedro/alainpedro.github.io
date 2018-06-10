<template>
  <div id="app">
    <header>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <router-link to="/home">
        <button type="button" class="btn" style="margin-right: 5px">
          Home
        </button>
      </router-link>
      <router-link to="/Login" v-if="!user.authenticated">
        <button type="button" class="btn btn-primary btn-md">Sign In</button>
      </router-link>
      <button type="button" class="btn btn-primary btn-md" v-if="user.authenticated" @click="logout()">
        Logout
      </button>
      <div id="title" class="noselect">MyTrip</div>
    </header>

    <main>
      <router-view></router-view>
      <zap-slideout v-if="user.authenticated"></zap-slideout>
    </main>
  </div>


</template>

<script>
import auth from './auth/index'
import router from './router/index'
export default {

  name: 'app',

   data() {
        return {
          user: auth.user,
          actualtripId: '',
        }
   },
  beforeMount() {
    this.actualtripId=localStorage.getItem('actualtripId');
  },
   methods: {
     logout() {
       auth.logout()
     },
     reload:function (){

     },
   }}
</script>


<style  lang="scss" >
  @import './scss/main';
</style>
