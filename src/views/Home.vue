<template>
    <Layout>
      <div class="mx-auto md:w-2/5 lg:w-2/3">
        <div class="lg:flex">
          <MyImage class="w-full my__image" />

          <About
            :name="name"
            class="bg-white flex-grow-1 ml-0  xl:-ml-20 lg:-ml-20 my-auto p-5  lg:p-10"
          />
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
import About from "@/Pages/About.vue";
import Social from "@/components/Social.vue";
export default {
  name:'Home',
  components: { Layout, MyImage, About, Social },
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
