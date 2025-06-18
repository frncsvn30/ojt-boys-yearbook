<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import img1 from '../assets/img/tupad-1.jpg'
import img2 from '../assets/img/tupad-2.jpg'
import img3 from '../assets/img/tupad-3.jpg'
import img4 from '../assets/img/tupad-4.jpg'
import img5 from '../assets/img/tupad-5.jpg'
import img6 from '../assets/img/tupad-6.jpg'

const images = [img1, img2, img3, img4, img5, img6]

const loading = ref(true)
const fadeOut = ref(false)
const showContent = ref(false)

const scrollY = ref(0)
const swiperRef = ref(null)

const handleScroll = () => {
  scrollY.value = window.scrollY
  if (swiperRef.value?.swiper) {
    if (scrollY.value > 200) {
      swiperRef.value.swiper.autoplay.stop()
    } else {
      swiperRef.value.swiper.autoplay.start()
    }
  }
}

const dynamicHeight = computed(() => {
  const minHeight = 400
  const maxHeight = window.innerHeight
  const scrolled = Math.min(scrollY.value, maxHeight - minHeight)
  return `${maxHeight - scrolled}px`
})

onMounted(() => {
  // Disable scrolling during loading
  document.body.style.overflow = 'hidden'
  
  window.addEventListener('scroll', handleScroll)
  
  // Start showing content immediately but with opacity 0
  showContent.value = true
  
  setTimeout(() => {
    // Start fading out the loading screen
    fadeOut.value = true
    
    // Remove loading screen completely after fade completes
    setTimeout(() => {
      loading.value = false
      // Re-enable scrolling after loading is complete
      document.body.style.overflow = 'auto'
    }, 1000) // Match the transition duration
  }, 3000)
})

onBeforeUnmount(() => {
  // Clean up: ensure scrolling is re-enabled if component unmounts
  document.body.style.overflow = 'auto'
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Full white overlay with centered text -->
   <div
    v-if="loading"
    :class="[ 
      'fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000 ease-out bg-white',
      fadeOut ? 'opacity-0' : 'opacity-100'
    ]"
  >
    <div class="text-center space-y-3">
      <h1 class="banner-title text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-gray-900">
        OJT Boys
      </h1>
      
      <div class="flex justify-center items-center gap-1 text-lg md:text-xl text-gray-600 font-medium">
        <span>Documenting Moments</span>
        <span class="loader-dot animate-bounce-dot delay-0">.</span>
        <span class="loader-dot animate-bounce-dot delay-1">.</span>
        <span class="loader-dot animate-bounce-dot delay-2">.</span>
      </div>
    </div>
  </div>


  <!-- Carousel -->
  <section
    v-show="showContent"
    :class="[
      'w-full transition-all duration-1000 ease-out overflow-hidden relative',
      loading ? 'opacity-0' : 'opacity-100'
    ]"
    :style="{ height: dynamicHeight }"
  >
    <Swiper
      ref="swiperRef"
      :modules="[Autoplay]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{ 
        delay: 3000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :speed="1200"
      :effect="'slide'"
      :grab-cursor="true"
      :touch-ratio="1"
      :threshold="5"
      :longSwipes="true"
      :longSwipesRatio="0.5"
      :longSwipesMs="300"
      :followFinger="true"
      :allowTouchMove="true"
      :resistance="true"
      :resistance-ratio="0.85"
      class="w-full h-full"
    >
      <SwiperSlide v-for="(img, index) in images" :key="index">
        <img :src="img" alt="Slide image" class="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
    
    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
      <div class="text-white text-sm font-medium mb-2 opacity-80">Scroll Down</div>
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-80">
        <div class="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.banner-title {
  font-family: 'MadeFutureX', sans-serif;
  font-weight: bold;

}

@keyframes bounceDot {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.animate-bounce-dot {
  display: inline-block;
  animation: bounceDot 1.2s infinite;
  font-size: 1.5rem;
  line-height: 1;
}

.delay-0 { animation-delay: 0s; }
.delay-1 { animation-delay: 0.15s; }
.delay-2 { animation-delay: 0.3s; }

</style>