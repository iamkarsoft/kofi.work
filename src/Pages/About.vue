<template>
  <div>
      <h2 class="font-bold text-center text-4xl">{{name}}</h2>
      <div class="text-center text-xl">
        Web developer from Ghana. I'm keen on building simple, responsive
        websites and web applications using PHP, Laravel, Javascript and
        writing my experiences
        <a
          href="https://blog.kofi.work"
          class="border-b-2 border-indigo-600 pb-1"
          target="_target"
          >on my blog.</a
        >
      </div>
  </div>
</template>

<script>
export default {
  name: "About",
  props: ['name']
};
</script>
