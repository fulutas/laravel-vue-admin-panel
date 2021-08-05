<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="row">
        <Menu />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import Nav from "@/components/Nav";
import Menu from "@/components/Menu";
import axios from "axios"
import {onMounted} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"

export default {
  name: "Wrapper",
  components: {
    Nav,
    Menu,
  },
  setup(){
    const router = useRouter()
    const store = useStore() // vuex

    onMounted(async () => {
      try {
        const { data } =  await axios.get('user') // giriş yapan kullanıcının bilgileri

        await store.dispatch('setUser', data)
        
      } catch (error) {
        await router.push('/login')
      }
     })
  }
};

</script>

<style scoped>
</style>
