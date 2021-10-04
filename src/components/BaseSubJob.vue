<template>
  <section class="job__content mt-4">
    <section class="lg:flex lg:justify-between relative">
      <slot name="title"></slot>
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
