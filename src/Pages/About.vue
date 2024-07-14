<template>
  <Layout>
      <section class="md:w-2/5 mx-auto mt-10 lg:w-2/4">
        
      <h1 class="mt-10 font-extrabold text-4xl">About</h1>
      <h2 class="font-bold  mt-4 text-3xl">Hi, I'm Kofi Romain Amoussou</h2>
      <p class="text-xl mt-4">
        I currently work as a web developer at a small agency / software company in Accra, Ghana. Most of the time is spent building web apps and internal tools using Laravel and Vue JS.
      </p>

      <p class="mt-4 text-xl">
        When I'm not at the computer, I enjoy dancing Kizomba, Xbox Gaming, Watching Formula 1 or Football, or either hanging out with <a href="https://www.4kgh.club" target="_blank">the squad</a>.
      </p>
      </section>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  name: "About",
  components:{
    Layout
  },
};
</script>
