<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

// image viewer setup
const isViewerOpen = ref(false)
const currentImageIndex = ref(0)

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function openViewer(imageIndex) {
  // calculate the absolute index in the full sortedImages array
  const absoluteIndex = (currentPage.value - 1) * itemsPerPage + imageIndex
  currentImageIndex.value = absoluteIndex
  isViewerOpen.value = true
  document.body.style.overflow = 'hidden' // prevent bg scrolling
}

function closeViewer() {
  isViewerOpen.value = false
  document.body.style.overflow = 'auto'
}

function nextImage() {
  if (currentImageIndex.value < sortedImages.length - 1) {
    currentImageIndex.value++
  }
}

function prevImage() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

function handleKeydown(event) {
  if (!isViewerOpen.value) return
  
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      nextImage()
      break
    case 'ArrowLeft':
      event.preventDefault()
      prevImage()
      break
    case 'Escape':
      event.preventDefault()
      closeViewer()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto' // cleanup
})
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
        <div v-for="(img, index) in paginatedImages" :key="index" 
             class="aspect-square overflow-hidden bg-white cursor-pointer group"
             @click="openViewer(index)">
          <img :src="img" alt="Gallery Image"
            class="w-full h-full object-cover group-hover:opacity-90 group-hover:scale-105 transition-all duration-300" />
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

  <!-- img viewer modal -->
  <Transition name="viewer">
    <div v-if="isViewerOpen" 
         class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
         @click.self="closeViewer">
      
      <!-- close button -->
      <button @click="closeViewer"
              class="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors duration-200">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- nav arrows -->
      <button v-if="currentImageIndex > 0"
              @click="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button v-if="currentImageIndex < sortedImages.length - 1"
              @click="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- main img -->
      <div class="flex items-center justify-center p-4">
        <img :src="sortedImages[currentImageIndex]" 
             alt="Gallery Image"
             class="max-w-[90vw] max-h-[90vh] object-contain"
             @click.stop>
      </div>

      <!-- img counter -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        {{ currentImageIndex + 1 }} / {{ sortedImages.length }}
      </div>

      <!-- instructions -->
      <div class="absolute bottom-4 right-4 text-white text-xs opacity-70">
        Arrow keys • ESC to close
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.3s ease;
}

.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}
</style>