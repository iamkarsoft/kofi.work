<template>
  <div class="max-w-4xl mx-auto">
    <router-link
      to="/blog"
      class="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
    >
      ← Back to Blog
    </router-link>

    <article class="bg-white p-8 rounded-lg shadow-lg">
      <header class="mb-8 pb-6 border-b-2 border-gray-200">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
          <span v-if="post.author">{{ post.author }}</span>
          <span v-if="post.date">{{ formatDate(post.date) }}</span>
          <div v-if="post.categories && post.categories.length > 0" class="flex gap-2 flex-wrap">
            <router-link
              v-for="category in post.categories"
              :key="category"
              :to="`/blog/category/${category.toLowerCase()}`"
              class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs hover:bg-indigo-200"
            >
              {{ category }}
            </router-link>
          </div>
        </div>
      </header>

      <div
        class="prose prose-lg max-w-none blog-content"
        v-html="post.html"
      ></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "PostLayout",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
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
/* Blog content styling */
.blog-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.blog-content :deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.blog-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.blog-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: "Courier New", monospace;
  font-size: 0.875em;
}

.blog-content :deep(pre) {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.blog-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #3730a3;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  font-style: italic;
  color: #4b5563;
}

.blog-content :deep(a) {
  color: #3730a3;
  text-decoration: underline;
}

.blog-content :deep(a:hover) {
  color: #4c1d95;
}

.blog-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>

