<template>
  <Layout>
      <div class="mx-auto md:w-2/5 lg:w-2/4 mt-10">
        <Link
          v-for="link in linksList"
          :link="link"
          :key="link.title"
          :href="link.link"
        />
      </div>
  </Layout>
</template>

<script>

import Layout from "@/components/Layout.vue";
import Link from "@/components/Link.vue";

export default {
components:{Layout,Link },

data() {
  return {
    linksList: [
      {
        title: "Methods Are Affordances, Not Abilities",
        link: "https://adamwathan.me/2017/01/24/methods-are-affordances-not-abilities/",
        dateAdded: "2024-01-23",
        category: "DevOps"
      }
      ],
    }
  },
};
</script>

<style>

</style>
