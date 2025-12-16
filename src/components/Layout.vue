<template>
  <div class="wrapper p-4">
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
