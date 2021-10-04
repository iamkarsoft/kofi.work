<template>
  <header class="w-full  flex lg:justify-between p-4">
    <section>
      <h1 class="text-4xl">Kofi Ramos</h1>
    </section>

    <section class="flex px-4">
        <Social href="https://github.com/iamkarsoft" social="github" name="github" class="fab fa-github fa-2x"></Social>
        <a href="mailto:karsoft92@gmail.com" class="mx-2 mt-4 text-xl"><i class="fas fa-envelope fa-2x"></i>&nbsp;karsoft92@gmail.com</a>
        <router-link to="/" class="mx-2 mt-4 text-xl">Kofi.work</router-link>
    </section>



  </header>
</template>


<script>
import Social from '@/components/Social.vue'

export default{
  name: "ResumeHeader",
  components:{
    Social
  }
};
</script>


<style>

</style>
