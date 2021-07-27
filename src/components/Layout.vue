<template>
  <div class="wrapper p-5">
    <Navigation />
    <slot></slot>
  </div>
</template>

<script>
import Navigation from './Navigation.vue';

export default{
  name: "Layout",
  components:{ Navigation}
}
</script>
