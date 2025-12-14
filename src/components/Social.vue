<template>
  <a class="mx-2 mt-4" target="_blank"><i :class="social.icon"></i></a>
</template>

<script>
export default {
  name: "Social",
  props: ["social"],
}
</script>
