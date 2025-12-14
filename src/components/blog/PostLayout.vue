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

    <!-- Navigation: Previous/Next Posts -->
    <div v-if="previousPost || nextPost" class="mt-8 flex justify-between gap-4 border-t-2 border-gray-200 pt-8">
      <router-link
        v-if="previousPost"
        :to="`/blog/${previousPost.slug}`"
        class="flex-1 p-4 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
      >
        <div class="text-sm text-gray-500 mb-1">← Previous Post</div>
        <div class="font-semibold text-indigo-600">{{ previousPost.title }}</div>
      </router-link>
      <div v-else class="flex-1"></div>
      
      <router-link
        v-if="nextPost"
        :to="`/blog/${nextPost.slug}`"
        class="flex-1 p-4 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow text-right"
      >
        <div class="text-sm text-gray-500 mb-1">Next Post →</div>
        <div class="font-semibold text-indigo-600">{{ nextPost.title }}</div>
      </router-link>
      <div v-else class="flex-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostLayout",
  props: {
    post: {
      type: Object,
      required: true
    },
    previousPost: {
      type: Object,
      default: null
    },
    nextPost: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.addCopyButtons();
  },
  updated() {
    this.addCopyButtons();
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
    addCopyButtons() {
      this.$nextTick(() => {
        const codeBlocks = this.$el.querySelectorAll('pre code');
        codeBlocks.forEach((codeBlock) => {
          const pre = codeBlock.parentElement;
          
          // Skip if button already exists
          if (pre.querySelector('.copy-code-btn')) {
            return;
          }
          
          // Create copy button
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-code-btn';
          copyBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span class="copy-text">Copy</span>
          `;
          
          copyBtn.addEventListener('click', async () => {
            const text = codeBlock.textContent || codeBlock.innerText;
            try {
              await navigator.clipboard.writeText(text);
              copyBtn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="copy-text">Copied!</span>
              `;
              copyBtn.classList.add('copied');
              setTimeout(() => {
                copyBtn.innerHTML = `
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span class="copy-text">Copy</span>
                `;
                copyBtn.classList.remove('copied');
              }, 2000);
            } catch (err) {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = text;
              textArea.style.position = 'fixed';
              textArea.style.opacity = '0';
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              
              copyBtn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="copy-text">Copied!</span>
              `;
              copyBtn.classList.add('copied');
              setTimeout(() => {
                copyBtn.innerHTML = `
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span class="copy-text">Copy</span>
                `;
                copyBtn.classList.remove('copied');
              }, 2000);
            }
          });
          
          // Make pre relative for absolute positioning
          pre.style.position = 'relative';
          pre.appendChild(copyBtn);
        });
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
  position: relative;
  background-color: #0d1117;
  color: #c9d1d9;
  padding: 1rem;
  padding-top: 2.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid #30363d;
}

.blog-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Copy button styling */
.blog-content :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background-color: #21262d;
  border: 1px solid #30363d;
  border-radius: 0.375rem;
  color: #c9d1d9;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.blog-content :deep(.copy-code-btn:hover) {
  background-color: #30363d;
  border-color: #484f58;
  color: #f0f6fc;
}

.blog-content :deep(.copy-code-btn.copied) {
  background-color: #238636;
  border-color: #2ea043;
  color: #ffffff;
}

.blog-content :deep(.copy-code-btn svg) {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.blog-content :deep(.copy-code-btn .copy-text) {
  white-space: nowrap;
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

