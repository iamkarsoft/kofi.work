<template>
  <Layout>
    <div class="w-full lg:w-3/4 mx-auto bg-white border-2 border-gray-400 p-4">
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
            <div>
              I'm a Web developer from Ghana. I'm keen on building responsive websites and web applications using PHP, Laravel, VueJS.
            </div>
          </base-aside>
          <base-aside>
            <template v-slot:title>
              <h2 class="text-4xl resume__title">Skills</h2>
            </template>
            <div class="grid lg:grid-cols-2">
              <section class="mt-4 p-2">
                <h3>Languages</h3>
                <ul class="text-sm">
                  <li>PHP</li>
                  <li>Javascript</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3>Frameworks</h3>
                <ul class="text-sm">
                  <li>VueJS</li>
                  <li>Laravel</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3>CMS</h3>
                <ul class="text-sm">
                  <li>Wordpress</li>
                </ul>
              </section>
              <section class="mt-4 p-2">
                <h3>Dev Ops</h3>
                <ul class="text-sm">
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
            <template v-slot:title>
              <h2 class="text-4xl resume__title">Education</h2>
            </template>
            <section>
              <h2 class="text-2xl resume__title--sub">The Internet</h2>
              <section>
                <ul>
                  <li>Udemy</li>
                  <li>Udacity</li>
                  <li>Free Code Camp</li>
                  <li>Youtube</li>
                </ul>
              </section>
            </section>
          </base-aside>
        </aside>
        <!-- / -->
        <!-- job experiences -->
        <section class="lg:col-span-2  border-2 border-gray-400 p-4 ">
          <h2 class="text-4xl">Experiences</h2>
          <section class="">
            <base-job>
              <template v-slot:title>
                <h3 class="job__title font-bold text-xl text-gray-700 my-2 ml-2">FullStack Web Developer</h3>
              </template>
              <template v-slot:date>
                <span class=" my-2">September 2021 - Present</span>
              </template>
              <template v-slot:company>
                AppGharage
              </template>
              <base-sub-job>
                <template v-slot:title>
                  <h3 class="job__title--sub font-bold text-xl text-gray-700 my-2">Web Developer Intern</h3>
                </template>
                <template v-slot:date>
                  <span class="my-2">March 2021 - September 2021</span>
                </template>

              </base-sub-job>
            </base-job>
            <base-job>
              <template v-slot:title>
                <h3 class="job__title font-bold text-xl text-gray-700 my-2 ml-2">Web Developer Intern</h3>
              </template>
              <template v-slot:date>
                <span class=" my-2">May 2020 - October 2020</span>
              </template>
              <template v-slot:company>
                TeamAlfy
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
import Layout from '@/components/Layout.vue'
import BaseAside from '@/components/BaseAside.vue'
import ResumeHeader from '@/components/ResumeHeader.vue'
import BaseJob from '@/components/BaseJob.vue'
import BaseSubJob from '@/components/BaseSubJob.vue'

export default {
  name: "MyResume",
  components: {
    Layout,
    ResumeHeader,
    BaseAside,
    BaseJob,
    BaseSubJob
  },
  data() {
    return {}
  }
};

</script>
<style scoped>
.job__title:before {
  content: " ";
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: #f68d5e;
  position: absolute;
  top: 1.2rem;
  left: -5px;
}

</style>
