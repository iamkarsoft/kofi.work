<template>
  <Layout>
    <div
      class="
        w-full
        lg:w-3/4
        mx-auto
        bg-white
        border-2 border-gray-400
        p-4
        mt-10
      "
    >
      <section class="w-full">
        <resume-header></resume-header>
      </section>
      <section class="w-full grid lg:grid-cols-3 gap-2">
        <!-- aside -->
        <aside class="lg:col-span-1">
          <base-aside class="mt-0">
            <template v-slot:title>
              <h2 class="text-4xl resume__title">About</h2>
            </template>
            <div class="px-2 my-2">
              Software Engineer with experience in Web application development,
              API Development, and Integrations. Over the years, I've dabbled in
              backend and frontend development .
            </div>
          </base-aside>
          <base-aside>
            <template v-slot:title>
              <h2 class="text-4xl resume__title">Skills</h2>
            </template>
            <div class="grid lg:grid-cols-2">
              <section class="mt-4 p-2">
                <h3 class="text-md font-bold text-orange">Languages</h3>
                <ul class="text-sm list-disc px-2 lg:ml-4">
                  <li>PHP</li>
                  <li>Javascript</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3 class="text-md font-bold text-orange">Frameworks</h3>
                <ul class="text-sm list-disc px-2 lg:ml-4">
                  <li>VueJS</li>
                  <li>Laravel</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3 class="text-md font-bold text-orange">CMS</h3>
                <ul class="text-sm list-disc px-2 lg:ml-4">
                  <li>Wordpress</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3 class="text-md font-bold text-orange">Dev Ops</h3>
                <ul class="text-sm list-disc px-2 lg:ml-4">
                  <li>Forge</li>
                  <li>Shared Hosting</li>
                  <li>Heroku</li>
                  <li>Digital Ocean</li>
                  <li>Ubuntu</li>
                </ul>
              </section>
            </div>
          </base-aside>
          <base-aside>
            <template v-slot:title class="">
              <h2 class="resume__title">Education</h2>
            </template>
            <section class="mt-2">
              <section class="px-4">
                <ul class="list-disc px-8">
                  <li>Udemy</li>
                  <li>Udacity</li>
                  <li>Scrimba</li>
                  <li>Free Code Camp</li>
                  <li>Laracast</li>
                  <li>Vue Mastery & Vue School</li>
                  <li>Youtube</li>
                  <li>Podcasts (Syntax fm, LN Podcast, Dev News...)</li>
                </ul>
              </section>
            </section>
          </base-aside>
        </aside>
        <!-- / -->
        <!-- job experiences -->
        <section class="lg:col-span-2 border-2 border-gray-400 p-4">
          <h2 class="border-b-2 border-slate-400 text-4xl font-extrabold text-orange">Experiences</h2>
          <section class="border-l-4 border-slate-400">
            <base-job>
              <template v-slot:title>
                <h3>
                  Full-Stack Web Developer
                </h3>
              </template>
              <template v-slot:date>
                <span class="my-2">September 2021 - Present</span>
              </template>
              <template v-slot:company>
                <span class="text-orange">AppGharage</span>
              </template>

              <template v-slot:duties class="px-8">
                <ul class="list-disc px-8">
                  <li>Building internal tools using Laravel, Node, Express.</li>
                  <li>
                    Working in a team of 2 using Laravel, Inertia JS, Vue JS.
                  </li>
                  <li>
                    Deploying web apps to hosting platforms such as Digital
                    ocean, Netlify and Laravel Forge.
                  </li>
                </ul>
              </template>
            </base-job>
            <base-job>
              <template v-slot:title>
                <h3>
                  Web Developer Intern
                </h3>
              </template>
              <template v-slot:date>
                <span class="my-2"> March 2021 – August 2021</span>
              </template>
              <template v-slot:company>
                <span class="text-orange">AppGharage</span>
              </template>

              <template v-slot:duties class="px-8">
                <ul class="list-disc px-8">
                  <li>Built internal tools using Laravel, Node, Express.</li>
                  <li>
                   Worked with a team of 4 building the backend using Laravel
                  </li>
                  <li>
                    Api Integration with Laravel, Vue JS and Inertia JS
                  </li>
                </ul>
              </template>
            </base-job>
            <base-job>
              <template v-slot:title>
                <h3
                  class="job__title font-bold text-2xl text-gray-700"
                >
                  Web Developer Intern
                </h3>
              </template>
              <template v-slot:date>
                <span class="my-2">May 2020 - October 2020</span>
              </template>
              <template v-slot:company > <span class="text-orange">TeamAlfy</span> </template>
                <template v-slot:duties class="px-8">
                <ul class="list-disc px-8">
                  <li>Built frontend of websites using frontend frameworks and javascript (JQuery)</li>
                  <li>
                   Worked on legacy WordPress themes to make required changes and accommodate new features and fixes
                  </li>

                </ul>
              </template>
            </base-job>
          </section>
        </section>
        <!-- /job experience -->
      </section>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout.vue";
import BaseAside from "@/components/BaseAside.vue";
import ResumeHeader from "@/components/ResumeHeader.vue";
import BaseJob from "@/components/BaseJob.vue";

export default {
  name: "MyResume",
  components: {
    Layout,
    ResumeHeader,
    BaseAside,
    BaseJob,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.text-orange, .resume__title{
  color:#f97316;
}
</style>
