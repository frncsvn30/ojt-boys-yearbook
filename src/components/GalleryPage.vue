<script setup>
import { ref, computed } from 'vue'

// import all images from gallery folder
const imageModules = import.meta.glob('../assets/img/gallery/*.jpg', { eager: true, import: 'default' })

// sort images in order
const sortedImages = Object.entries(imageModules)
  .sort(([aPath], [bPath]) => {
    const aNum = parseInt(aPath.match(/ojt-(\d+)\.jpg/)?.[1] || 0)
    const bNum = parseInt(bPath.match(/ojt-(\d+)\.jpg/)?.[1] || 0)
    return aNum - bNum
  })
  .map(([, module]) => module)

// pagination setup
const currentPage = ref(1)
const itemsPerPage = 12 // 4 columns x 3 rows = 12 images per page

const totalPages = computed(() => Math.ceil(sortedImages.length / itemsPerPage))

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedImages.slice(start, start + itemsPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="fixed top-6 left-4 sm:top-8 sm:left-6 z-10">
    <router-link to="/"
      class="relative inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-black group bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2.5  hover:border-black transition-all duration-300">
      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 transform group-hover:-translate-x-0.5"
        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 5L5 19M19 19H5V5" />
      </svg>
      <span class="hidden sm:inline">Back to Home</span>
      <span class="sm:hidden">Back</span>

      <!-- underline -->
      <span
        class="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
    </router-link>
  </div>

  <div class="w-full mx-auto min-h-screen flex flex-col items-center justify-center py-16 sm:py-24 bg-white text-black">

    <div class="text-center mb-16 sm:mb-20 lg:mb-24 space-y-4 sm:space-y-6">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extralight text-black tracking-wide">
        Gallery
      </h1>
      <div class="w-px h-12 sm:h-16 bg-black mx-auto opacity-60"></div>
      <p class="text-xs sm:text-sm text-gray-500 font-light tracking-wider uppercase">
        A Look Back at Our Journey
      </p>
    </div>

    <div class="px-4 sm:px-6 md:px-0">
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-px bg-gray-200 border border-gray-200">
        <div v-for="(img, index) in paginatedImages" :key="index" class="aspect-square overflow-hidden bg-white">
          <img :src="img" alt="Gallery Image"
            class="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300" />
        </div>
      </div>
    </div>

    <!-- pagination controls -->
    <div class="mt-12 sm:mt-16 flex justify-center items-center gap-px flex-wrap">
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
        'px-3 py-2 sm:px-5 sm:py-3 text-xs font-medium transition-colors duration-200 border-r border-gray-300 last:border-r-0 min-w-[2.5rem] sm:min-w-[3rem]',
        currentPage === page
          ? 'bg-black text-white'
          : 'bg-white text-black hover:bg-gray-50'
      ]">
        {{ page.toString().padStart(2, '0') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>