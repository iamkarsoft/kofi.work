<template>
  <Layout>
    <div class="w-full lg:w-2/3 mx-auto mt-10">
      <h3 class="text-4xl text-center font-bold mt-10">Projects</h3>

      <section class="mt-4 grid lg:grid-cols-3 gap-4 pt-10  ">
        <a href="http://invoices.kofi.work" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col ">
          <header class="lg:flex justify-center h-40">
            <div class="text-center">
              <h4 class="text-4xl font-bold h-24">Invoices</h4>
              <div class="text-gray-800 text-md font-bold">
                Personal Project
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2021 - Ongoing</span
              >
            </div>
          </header>
          <article class="mt-5">
            A mini invoice app i'm building to handle billing for future
            clients.
          </article>
        </a>

           <a  href="https://www.merbakmondeal.com/" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col ">
          <header class="lg:flex justify-ceter text-center h-40">
            <div>
              <h4 class="text-4xl font-bold h-24">Merbak Mondeal</h4>
              <div class="text-gray-800 text-md font-bold">
                <a href="https://kamalnet.work" target="_blank">Kamal Network Agency</a>
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2021 - Ongoing</span
              >
            </div>

          </header>
          <article class="mt-5">
            Merbak provides quality engineering and procurement services which
            includes Electrical and Electronic Instrumentation, ROV tools,
            subsea equipment and many more.
          </article>
        </a>


        <a href="https://movieapp.kofi.work" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col  ">
          <header class="lg:flex h-40 text-center justify-center">
            <div>
              <h4 class="text-4xl font-bold h-24">Movie App</h4>
              <div class="text-gray-800 text-md font-bold">
                Personal Project
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2020 - Ongoing</span
              >
            </div>
          </header>
          <article class="mt-5">
            A mini app that pulls a list of current movies and series from
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              >The Movie Db</a
            >.
          </article>

        </a>

        <a href="https://edwuma.kofi.work" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col ">
          <header class="lg:flex text-center justify-center h-40 ">
            <div>
              <h4 class="text-4xl font-bold h-24">Edwuma Portal</h4>
              <div class="text-gray-800 text-md font-bold">
                Personal Project
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2019 - Ongoing</span
              >
            </div>

          </header>
          <article class="mt-5">
            Edwuma is a job portal linking recruiters and talents.
          </article>

        </a>

        <a href="http://sgidghana.com" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col justify-between ">
          <header class="lg:flex justify-center text-center h-40">
            <div>
              <h4 class="text-4xl font-bold h-24">SGID Ghana</h4>
              <div class="text-gray-800 text-md font-bold">
                <a href="https://kamalnet.work" target="_blank">Kamal Network Agency</a>
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2019 - Ongoing</span
              >
            </div>
                   </header>
          <article class="mt-5">
            Under Maitenance
          </article>
        </a>



        <a href="http://merbakconcrete.com/" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col justify-between  ">
          <header class="lg:flex justify-center text-center h-40">
            <div>
              <h4 class="text-4xl font-bold h-24">Merbak Concrete</h4>
              <div class="text-gray-800 text-md font-bold">
                <a href="https://kamalnet.work" target="_blank">Kamal Network Agency</a>
              </div>
              <span class="text-gray-600 text-md font-bold"
                >2019</span
              >
            </div>

          </header>
          <article class="mt-5">
            Merbak construction and concrete products is a concrete product company located at Adenta, Amanfrom Junction.
          </article>
        </a>

        <a  href="https://traveldotcom.org/" target="_blank" class="bg-white border-2 border-gray-200 rounded-lg p-5 mt-5 flex flex-col ">
          <header class="lg:flex justify-center text-center h-40">
            <div>
              <h4 class="text-4xl font-bold h-24">Travel Dot Com</h4>
              <div class="text-gray-800 text-md font-bold">Freelance</div>
              <span class="text-gray-600 text-md font-bold"
                >2016</span
              >
            </div>

          </header>
          <article class="mt-5">
            Travel Dot Com provide a range of well packages, services for the hospitality industry for both local and foreign tourist including trips and flight arrangement, ground handling and conference for growth.
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
