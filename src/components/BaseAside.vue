<template>
  <div class="mb-4 p-4 border-2 border-gray-400">
    <header class=" border-b-2 border-slate-400 text-4xl font-extrabold">
      <slot name="title"></slot>
    </header>
    <div>
    <slot></slot>
    </div>

  </div>
</template>

<script>
export default {

  name: 'BaseAside',

  data () {
    return {

    }
  }
};
</script>

<style lang="css" scoped>
</style>
