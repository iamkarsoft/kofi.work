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
  name: "MinimalLayout",
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
</style>

