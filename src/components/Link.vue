<template>
  <a class="mt-4 my-2" target="_blank">
    <div class="flex gap-4">
      <div class="text-sm text-indigo-500"><span class="font-bold">Date</span>: {{ link.dateAdded}}</div>

      <div class="text-sm text-indigo-500"><span class="font-bold">Category:</span> {{link.category}}
     </div>
   </div>

    <div class="font-bold text-2xl">{{link.title}}</div>
  </a>
</template>

<script>
export default {
  name: "Link",
  props: ["link"],
}
</script>
