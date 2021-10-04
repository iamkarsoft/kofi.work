<template>
  <section class="job__content mt-4 p-3">
    <section class="lg:flex lg:justify-between relative">
      <slot name="title"></slot>
      <slot name="date"></slot>
    </section>
    <section class="border-l border-gray-400  p-2">
      <section class="text-sm">
        <slot name="company"></slot>
      </section>
      <section>
        <slot></slot>
      </section>
    </section>
  </section>
</template>
<script>
export default {

  name: 'BaseJob',

  data() {
    return {

    }
  }
};

</script>
<style lang="css" scoped>

</style>
