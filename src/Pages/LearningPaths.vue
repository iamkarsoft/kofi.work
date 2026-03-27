<template>
  <Layout>
    <div class="w-full mx-auto mt-10 max-w-6xl px-2">
      <!-- Index View: All Learning Paths -->
      <template v-if="!selectedTopic">
        <h3 class="mt-10 text-4xl font-bold text-center mb-4">Learning Paths</h3>
        <p class="text-center text-gray-600 mb-10">
          Curated series of posts to help you learn a topic step by step.
        </p>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="(pathData, topic) in learningPaths"
            :key="topic"
            :to="`/learning-paths/${topic}`"
            class="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-indigo-300 transition-all"
          >
            <h4 class="text-2xl font-bold mb-2">{{ pathData.label }}</h4>
            <p class="text-gray-600 text-sm">
              {{ pathData.posts.length }} {{ pathData.posts.length === 1 ? 'post' : 'posts' }}
              <span v-if="Object.keys(pathData.courses).length > 0" class="ml-1">
                · {{ Object.keys(pathData.courses).length }} {{ Object.keys(pathData.courses).length === 1 ? 'course' : 'courses' }}
              </span>
            </p>
          </router-link>
        </div>

        <div v-if="Object.keys(learningPaths).length === 0" class="text-center py-10 text-gray-500">
          <p>No learning paths yet. Check back soon!</p>
        </div>
      </template>

      <!-- Topic View: Posts in a Learning Path -->
      <template v-else>
        <div class="mb-6">
          <router-link
            to="/learning-paths"
            class="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
          >
            ← All Learning Paths
          </router-link>
        </div>

        <h3 class="text-4xl font-bold mb-2">{{ currentPath.label }}</h3>
        <p class="text-gray-600 mb-8">
          {{ currentPath.posts.length }} {{ currentPath.posts.length === 1 ? 'post' : 'posts' }}
        </p>

        <!-- Courses -->
        <div v-if="Object.keys(currentPath.courses).length > 0" class="space-y-10">
          <section v-for="(coursePosts, courseName) in currentPath.courses" :key="courseName">
            <h4 class="text-2xl font-bold mb-4">{{ courseName }}</h4>
            <ol class="space-y-4">
              <li
                v-for="(post, index) in coursePosts"
                :key="post.slug"
                class="flex gap-4 items-start p-5 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                  {{ index + 1 }}
                </span>
                <div class="flex-1">
                  <router-link :to="`/blog/${post.slug}`" class="block">
                    <h4 class="text-xl font-bold mb-1">{{ post.title }}</h4>
                    <div class="text-sm text-gray-600">
                      <span v-if="post.date">{{ formatDate(post.date) }}</span>
                    </div>
                    <p v-if="post.excerpt" class="text-gray-700 mt-2 text-sm">{{ post.excerpt }}</p>
                  </router-link>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <!-- Uncategorised posts (no course) -->
        <div v-if="uncategorisedPosts.length > 0" :class="{ 'mt-10': Object.keys(currentPath.courses).length > 0 }">
          <h4 v-if="Object.keys(currentPath.courses).length > 0" class="text-2xl font-bold mb-4">Other Posts</h4>
          <ol class="space-y-4">
            <li
              v-for="(post, index) in uncategorisedPosts"
              :key="post.slug"
              class="flex gap-4 items-start p-5 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                {{ index + 1 }}
              </span>
              <div class="flex-1">
                <router-link :to="`/blog/${post.slug}`" class="block">
                  <h4 class="text-xl font-bold mb-1">{{ post.title }}</h4>
                  <div class="text-sm text-gray-600">
                    <span v-if="post.date">{{ formatDate(post.date) }}</span>
                  </div>
                  <p v-if="post.excerpt" class="text-gray-700 mt-2 text-sm">{{ post.excerpt }}</p>
                </router-link>
              </div>
            </li>
          </ol>
        </div>

        <div v-if="currentPath.posts.length === 0" class="text-center py-10 text-gray-500">
          <p>No posts found for "{{ selectedTopic }}".</p>
        </div>
      </template>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { getLearningPaths } from "@/utils/blogLoader";

export default {
  name: "LearningPaths",
  components: {
    Layout,
  },
  data() {
    return {
      learningPaths: {},
      selectedTopic: null,
    };
  },
  computed: {
    currentPath() {
      if (!this.selectedTopic) return { label: '', posts: [], courses: {} };
      return this.learningPaths[this.selectedTopic] || { label: this.selectedTopic, posts: [], courses: {} };
    },
    uncategorisedPosts() {
      return this.currentPath.posts.filter(post => !post.course);
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    $route() {
      this.updateTopic();
    },
  },
  methods: {
    async loadData() {
      const { initializeBlogPosts } = await import("@/utils/blogLoader");
      await initializeBlogPosts();
      this.learningPaths = getLearningPaths();
      this.updateTopic();
    },
    updateTopic() {
      this.selectedTopic = this.$route.params.topic
        ? this.$route.params.topic.toLowerCase()
        : null;
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
