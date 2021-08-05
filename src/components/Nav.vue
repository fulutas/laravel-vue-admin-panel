<template>
     <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
  <div class="navbar-nav">
    <div class="nav-item text-nowrap d-flex">
      <router-link to="/profile" class="nav-link px-3 text-warning" href="#">{{ name }} </router-link>
      <router-link to="/login" class="nav-link px-3" href="#" @click="logout">Sign out</router-link>
    </div>
  </div>
</header>
</template>

<script lang="ts">

import {ref, computed, watch} from "vue"
import axios from "axios"
import { useStore } from 'vuex'

export default {
    name : "Nav",
    setup(){
      
     const name = ref('') 
     
     const store = useStore() // vuex

     const user = computed(() => store.state.user)

    watch(user, () => {
      return name.value = user.value.first_name + ' ' + user.value.last_name
    })

    const logout = async () => {
       try {
         await axios.post('logout')
       } catch (error) {
         console.log("logout", error)
       }
     }

    return {
       name,
       logout,
     }
  }
}
</script>

<style>

</style>