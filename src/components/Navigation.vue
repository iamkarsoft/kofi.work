<template>
  <nav class="lg:flex justify-between w-full lg:w-3/4 mx-auto lg:px-10 pt-0 mt-0">
    <div class="text-6xl p-4 text-left font-bold">
      <router-link to="/" class="mb-4">KR</router-link>
    </div>
    <div class="lg:flex items-center">
      <router-link to="/about" class="m-4">About</router-link>
      <router-link to="/portfolio" class="m-4">Portfolio</router-link>
      <router-link to="/resume" class="m-4">Resume</router-link>
      <router-link to="/blog" class="m-4">Blog</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style >
nav .router-link-exact-active, nav .router-link-active {
  font-weight: bolder;
  padding-bottom: 2px;
  border-bottom: 4px solid #3730A3;
}
</style>
