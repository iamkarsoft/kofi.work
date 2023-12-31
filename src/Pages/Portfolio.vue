<template>
  <Layout>
    <div class="w-full mx-auto mt-10 lg:w-2/3">
      <h3 class="mt-10 text-4xl font-bold text-center">Projects</h3>

      <section class="grid gap-4 pt-10 mt-4 lg:grid-cols-3">
        <a
          href="http://invoices.kofi.work"
          target="_blank"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg"
        >
          <header class="justify-center h-40 lg:flex">
            <div class="text-center">
              <h4 class="h-24 text-4xl font-bold">Invoices</h4>
              <div class="font-bold text-gray-800 text-md">
                Personal Project
              </div>
              <span class="font-bold text-gray-600 text-md"
                >2021 - Ongoing</span
              >
            </div>
          </header>
          <article class="mt-5">
            A mini invoice app i'm building to handle billing for future
            clients.
          </article>
        </a>

        <a
          href="https://www.merbakmondeal.com/"
          target="_blank"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg"
        >
          <header class="h-40 text-center lg:flex justify-ceter">
            <div>
              <h4 class="h-24 text-4xl font-bold">Merbak Mondeal</h4>
              <div class="font-bold text-gray-800 text-md">
                <a href="https://kamalnet.work" target="_blank"
                  >Kamal Network Agency</a
                >
              </div>
              <span class="font-bold text-gray-600 text-md"
                >2021 - Ongoing</span
              >
            </div>
          </header>
          <article class="">
            Merbak provides quality engineering and procurement services which
            includes Electrical and Electronic Instrumentation, ROV tools,
            subsea equipment and many more.
          </article>
        </a>

        <a
          href="https://movieapp.kofi.work"
          target="_blank"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg"
        >
          <header class="justify-center h-40 text-center lg:flex">
            <div>
              <h4 class="h-24 text-4xl font-bold">Movie App</h4>
              <div class="font-bold text-gray-800 text-md">
                Personal Project
              </div>
              <span class="font-bold text-gray-600 text-md"
                >2020 - Ongoing</span
              >
            </div>
          </header>
          <article class="">
            A mini app that pulls a list of current movies and series from
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              >The Movie Db</a
            >.
          </article>
        </a>

        <a
          href="https://edwuma.kofi.work"
          target="_blank"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg"
        >
          <header class="justify-center h-40 text-center lg:flex">
            <div>
              <h4 class="h-24 text-4xl font-bold">Edwuma Portal</h4>
              <div class="font-bold text-gray-800 text-md">
                Personal Project
              </div>
              <span class="font-bold text-gray-600 text-md"
                >2019 - Ongoing</span
              >
            </div>
          </header>
          <article class="">
            Edwuma is a job portal linking recruiters and talents.
          </article>
        </a>

        <a
          href="http://merbakconcrete.com/"
          target="_blank"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg"
        >
          <header class="justify-center h-40 text-center lg:flex">
            <div>
              <h4 class="h-24 text-4xl font-bold">Merbak Concrete</h4>
              <div class="font-bold text-gray-800 text-md">
                <a href="https://kamalnet.work" target="_blank"
                  >Kamal Network Agency</a
                >
              </div>
              <span class="font-bold text-gray-600 text-md">2019</span>
            </div>
          </header>
          <article class="">
            Merbak construction and concrete products is a concrete product
            company located at Adenta, Amanfrom Junction.
          </article>
        </a>
      </section>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
export default {
  name: "Portfolio",
  components: {
    Layout,
  },
};
</script>

<style  scoped>
article {
  min-height: 5rem;
}
</style>
