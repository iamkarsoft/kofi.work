<template>
  <div class="max-w-3xl mx-auto">
    <router-link
      to="/blog"
      class="inline-block mb-4 text-indigo-600 hover:text-indigo-800 text-sm"
    >
      ← Back
    </router-link>

    <article class="bg-white p-6 rounded-lg">
      <header class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
        <div class="flex items-center gap-3 text-xs text-gray-500">
          <span v-if="post.date">{{ formatDate(post.date) }}</span>
          <span v-if="post.author">by {{ post.author }}</span>
        </div>
      </header>

      <div
        class="prose max-w-none blog-content"
        v-html="post.html"
      ></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "MinimalLayout",
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
.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.blog-content :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
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
</style>

