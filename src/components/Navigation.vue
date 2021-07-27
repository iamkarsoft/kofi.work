<template>
    <nav class="lg:flex justify-between lg:px-10">
      <div class="text-6xl p-4 text-left font-bold">
        KR
      </div>
      <div class="lg:flex items-center">
        <router-link to="/" class="m-4">Home</router-link>
        <router-link to="/portfolio" class="m-4">Portfolio</router-link>
       <a href="https://blog.kofi.work" target="_blank" class="m-4">Blog</a>
      </div>
    </nav>
</template>

<script>
export default {
  name: "Navigation",
}
</script>
