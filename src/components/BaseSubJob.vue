<template>
  <section class="job__content mt-4 relative">
    <section class="lg:flex lg:justify-between relative">
      <slot name="title" class="font-bold text-2xl text-gray-700 my-2"></slot>
      <slot name="date"></slot>
    </section>
    <section class="">
        <slot></slot>
    </section>
  </section>
</template>
<script>
export default {

  name: 'BaseSubJob',

  data() {
    return {

    }
  }
};

</script>
<style lang="css" scoped>

</style>
