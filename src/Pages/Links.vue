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
       title: "Fast-track your career: How I went from Junior -> Senior engineer in 2 years",
        link: "https://careercutler.substack.com/p/going-from-junior-senior-engineer",
        dateAdded: "2024-02-15",
        category: "Career"

      },
      {
       title: "How To Fix Common LetsEncrypt Errors",
        link: "https://www.digitalocean.com/community/tutorials/how-to-fix-common-letsencrypt-errors",
        dateAdded: "2024-02-15",
        category: "DevOps, Video, Tutorial"

      },
      ],
    }
  },
};
</script>

<style>

</style>
