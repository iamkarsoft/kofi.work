<template>
    <Layout>
      <div class="mx-auto md:w-2/5 lg:w-2/4 mt-10">
        <div class="lg:flex mt-10 lg:mt-0">
          <div class="w-40 rounded border-2   border-gray-200 ">
            <MyImage class="w-full transform -rotate-6 "/>
          </div>

          <div class="flex-1 px-4 mt-4 lg:mt-0">
            <h3 class="text-3xl font-extrabold  leading-none tracking-tight text-indigo-800">Kofi Ramos</h3>
            <p class="mt-2 text-3xl font-bold  leading-none tracking-tight ">Full Stack Web Developer</p>
          </div>

        </div>

        <div class="mt-4 text-xl mt-4">
        Web developer from Ghana. I'm keen on building clean, responsive
        websites and web applications using PHP, Laravel, Javascript.
        </div>

        <div class="flex mt-4 w-full">
          <Social
            v-for="social in socialList"
            :social="social"
            :key="social.name"
            :href="social.link"
            />
        </div>
      </div>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import MyImage from "@/components/MyImage.vue";
import Social from "@/components/Social.vue";
export default {
  name:'Home',
  components: { Layout, MyImage, Social },
  data() {
    return {
      name: "Kofi Ramos",
      socialList: [
        {
          name: "email",
          link: "mailto:karsoft92@gmail.com",
          icon: "fas fa-envelope fa-2x",
        },
        {
          name: "facebook",
          link: "http://facebook.com/iamkarsoft",
          icon: "fab fa-facebook-f fa-2x",
        },
        {
          name: "twitter",
          link: "http://twitter.com/iamkarsoft",
          icon: "fab fa-twitter fa-2x",
        },
        {
          name: "instagram",
          link: "http://instagram.com/iamkarsoft",
          icon: "fab fa-instagram fa-2x",
        },
        {
          name: "Github",
          link: "http://github.com/iamkarsoft",
          icon: "fab fa-github fa-2x"

        },
      ],
    };
  },
};
</script>
