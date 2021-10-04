<template>
  <div class="mt-4 p-4 border-2 border-gray-400">
    <header>
      <slot name="title"></slot>
    </header>
    <slot></slot>
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
