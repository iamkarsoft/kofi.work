<template>
  <Layout>
    <div class="w-full mx-auto mt-10 max-w-6xl px-2">
      <h3 class="mt-10 text-4xl font-bold text-center mb-8">Blog</h3>

      <!-- Active Category Indicator -->
      <div v-if="selectedCategory" class="mb-4 text-center">
        <span class="text-gray-600">
          Showing posts in: 
          <span class="font-bold capitalize text-indigo-600">{{ selectedCategory }}</span>
          <button
            @click="filterByCategory(null)"
            class="ml-2 text-sm text-indigo-600 hover:underline"
          >
            (Clear filter)
          </button>
        </span>
      </div>

      <!-- 2 Column Layout -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column: Blog Posts (2/3) -->
        <div class="lg:w-2/3">
          <!-- Top Pagination -->
          <div v-if="totalPages > 1" class="mb-6 flex justify-center items-center gap-2 flex-wrap text-xs">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors text-sm',
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              ]"
            >
              First
            </button>

            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors',
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              ]"
            >
              ← Previous
            </button>

            <div class="flex gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg font-semibold transition-colors',
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors',
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              ]"
            >
              Next →
            </button>

            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage === totalPages"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors',
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              ]"
            >
              Last
            </button>
          </div>

          <!-- Blog Posts -->
          <section class="grid gap-4 pt-4">
        <article
          v-for="post in paginatedPosts"
          :key="post.slug"
          class="flex flex-col p-5 mt-5 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
        >
          <router-link :to="`/blog/${post.slug}`" class="block">
            <header class="mb-4">
              <h4 class="text-3xl font-bold mb-2">{{ post.title }}</h4>
              <div class="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                <span v-if="post.author">{{ post.author }}</span>
                <span v-if="post.date">{{ formatDate(post.date) }}</span>
              </div>
              <div v-if="post.categories && post.categories.length > 0" class="flex gap-2 mt-2 flex-wrap">
                <router-link
                  v-for="category in post.categories"
                  :key="category"
                  :to="`/blog/category/${category.toLowerCase()}`"
                  @click.stop
                  class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs hover:bg-indigo-200"
                >
                  {{ category }}
                </router-link>
              </div>
            </header>
            <div v-if="post.excerpt" class="text-gray-700 mb-4">
              {{ post.excerpt }}
            </div>
            <div class="text-indigo-600 font-semibold">Read more →</div>
          </router-link>
        </article>

        <div v-if="filteredPosts.length === 0" class="text-center py-10 text-gray-500">
          <p v-if="selectedCategory">
            No posts found in category "{{ selectedCategory }}".
          </p>
          <p v-else>
            No blog posts yet. Check back soon!
          </p>
        </div>
      </section>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2 flex-wrap text-xs">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition-colors',
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          ]"
        >
          First
        </button>

        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition-colors',
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          ]"
        >
          ← Previous
        </button>
        
        <div class="flex gap-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-colors',
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition-colors',
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          ]"
        >
          Next →
        </button>

        <button
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition-colors',
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          ]"
        >
          Last
        </button>
      </div>

          <div v-if="totalPages > 1" class="mt-4 text-center text-sm text-gray-600">
            Page {{ currentPage }} of {{ totalPages }} ({{ filteredPosts.length }} posts)
          </div>
        </div>

        <!-- Right Column: Categories/Tags (1/3) -->
        <aside class="lg:w-1/3">
          <div class="sticky top-20">
            <div class="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
              <h4 class="text-xl font-bold mb-4">Categories</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  @click="filterByCategory(null)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    selectedCategory === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  All Posts
                </button>
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="filterByCategory(category)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize',
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  {{ category }}
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { getAllPosts, getAllCategories, getPostsByCategory, getAllPostsAsync } from "@/utils/blogLoader";

export default {
  name: "Blog",
  components: {
    Layout,
  },
  data() {
    return {
      allPosts: [],
      filteredPosts: [],
      categories: [],
      selectedCategory: null,
      currentPage: 1,
      postsPerPage: 5,
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.filteredPosts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      start = Math.max(1, end - maxVisible + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  mounted() {
    this.loadPosts();
    // Check category from route after posts are loaded
    this.$nextTick(() => {
      this.checkCategoryFromRoute();
    });
  },
  watch: {
    $route() {
      this.checkCategoryFromRoute();
    },
  },
  methods: {
    async loadPosts() {
      try {
        // Initialize and load posts
        const { initializeBlogPosts } = await import('@/utils/blogLoader');
        await initializeBlogPosts();
        this.allPosts = getAllPosts();
        this.categories = getAllCategories();
        // Apply filter after loading
        this.$nextTick(() => {
          this.checkCategoryFromRoute();
        });
      } catch (error) {
        this.allPosts = [];
        this.categories = [];
        this.filteredPosts = [];
      }
    },
    checkCategoryFromRoute() {
      if (this.$route.params.category) {
        const category = this.$route.params.category.toLowerCase();
        this.selectedCategory = category;
        this.applyFilter();
        // Don't push to router to avoid infinite loop
      } else {
        this.selectedCategory = null;
        this.applyFilter();
      }
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1; // Reset to first page when filtering
      
      // Update URL without triggering watch
      if (category) {
        if (this.$route.path !== `/blog/category/${category.toLowerCase()}`) {
          this.$router.push({ path: `/blog/category/${category.toLowerCase()}` }).catch(() => {});
        }
      } else {
        if (this.$route.path !== '/blog') {
          this.$router.push({ path: '/blog' }).catch(() => {});
        }
      }
      
      this.applyFilter();
    },
    applyFilter() {
      if (this.selectedCategory) {
        this.filteredPosts = getPostsByCategory(this.selectedCategory);
      } else {
        this.filteredPosts = [...this.allPosts];
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
article {
  min-height: 5rem;
}
</style>

