<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { login, getInfo } from '@/api/user.ts'


export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted(){
      login({username: 'admin',
            password: '123456' }).then(rel => {
                console.log(rel)
            })
            getInfo()
  }
}
</script>
