<template>
  <Layout>
    <div class="w-full mx-auto mt-10 lg:w-2/3">
      <div v-if="post">
        <component :is="layoutComponent" :post="post" />
      </div>

      <div v-else class="text-center py-10">
        <h2 class="text-2xl font-bold mb-4">Post Not Found</h2>
        <p class="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <router-link
          to="/blog"
          class="inline-block text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Back to Blog
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import PostLayout from "@/components/blog/PostLayout.vue";
import MinimalLayout from "@/components/blog/MinimalLayout.vue";
import { getPostBySlug } from "@/utils/blogLoader";

// Layout registry - add new layouts here
const layouts = {
  post: PostLayout,
  minimal: MinimalLayout,
  default: PostLayout,
};

export default {
  name: "BlogPost",
  components: {
    Layout,
    PostLayout,
    MinimalLayout,
  },
  data() {
    return {
      post: null,
    };
  },
  computed: {
    layoutComponent() {
      if (!this.post) return null;
      const layoutName = this.post.layout || 'post';
      return layouts[layoutName] || layouts.default;
    },
  },
  mounted() {
    this.loadPost();
  },
  watch: {
    $route() {
      this.loadPost();
    },
  },
  methods: {
    async loadPost() {
      const slug = this.$route.params.slug;
      try {
        // Try cached first
        let post = getPostBySlug(slug);
        if (!post) {
          // Load async if not in cache
          const { getPostBySlugAsync } = await import('@/utils/blogLoader');
          post = await getPostBySlugAsync(slug);
        }
        this.post = post;
      } catch (error) {
        this.post = null;
      }
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

