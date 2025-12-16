<template>
  <header class="w-full  lg:flex lg:justify-between p-4">
    <section>
      <h1 class="text-4xl lg:text-6xl text-orange font-extrabold">Kofi Romain Amoussou</h1>
    </section>

    <section class="flex px-4 items-center">
        <Social href="https://github.com/iamkarsoft" social="github" name="github" class="fab fa-github fa-2x" target="_blank"></Social>
        <a href="mailto:karsoft92@gmail.com" class="mx-2 mt-4" target="_blank"><i class="fas fa-envelope fa-2x"></i></a>
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


<style scoped>


</style>
