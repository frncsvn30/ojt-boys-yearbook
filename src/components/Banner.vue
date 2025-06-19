<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// Image imports
import img1 from '../assets/img/tupad-1.jpg'
import img2 from '../assets/img/tupad-2.jpg'
import img3 from '../assets/img/tupad-3.jpg'
import img4 from '../assets/img/tupad-4.jpg'
import img5 from '../assets/img/tupad-5.jpg'
import img6 from '../assets/img/tupad-6.jpg'

// Reactive state
const images = [img1, img2, img3, img4, img5, img6]
const loading = ref(true)
const fadeOut = ref(false)
const showContent = ref(false)
const scrollY = ref(0)
const swiperRef = ref(null)
const windowHeight = ref(0)

// Computed properties
const dynamicHeight = computed(() => {
  const minHeight = 60 // Minimum height in vh
  const maxHeight = 100 // Maximum height in vh
  const scrollFactor = Math.min(scrollY.value / windowHeight.value, 0.4)
  const currentHeight = maxHeight - (scrollFactor * (maxHeight - minHeight))
  return `${Math.max(currentHeight, minHeight)}vh`
})

const scrollIndicatorOpacity = computed(() => {
  const fadeStart = 50
  const fadeEnd = 200
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

// Event handlers
const handleScroll = () => {
  scrollY.value = window.scrollY
  
  // Control autoplay based on scroll position
  if (swiperRef.value?.swiper) {
    if (scrollY.value > windowHeight.value * 0.3) {
      swiperRef.value.swiper.autoplay.stop()
    } else {
      swiperRef.value.swiper.autoplay.start()
    }
  }
}

const handleResize = () => {
  windowHeight.value = window.innerHeight
}

// Lifecycle
onMounted(async () => {
  // Initialize window dimensions
  windowHeight.value = window.innerHeight
  
  // Disable scrolling during loading
  document.body.style.overflow = 'hidden'
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  
  // Show content immediately but hidden
  showContent.value = true
  
  // Loading sequence
  setTimeout(() => {
    fadeOut.value = true
    
    setTimeout(async () => {
      loading.value = false
      document.body.style.overflow = 'auto'
      
      // Ensure swiper is properly initialized
      await nextTick()
      if (swiperRef.value?.swiper) {
        swiperRef.value.swiper.update()
      }
    }, 1000)
  }, 2500) // Reduced loading time for better UX
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <!-- Modern Loading Screen -->
  <div
    v-if="loading"
    :class="[ 
      'fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 ease-out',
      'bg-gradient-to-br from-slate-50 via-white to-slate-100',
      fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    ]"
  >
    <!-- Animated background pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-pink-100/30 rounded-full blur-3xl animate-float-delayed"></div>
    </div>

    <div class="text-center space-y-8 relative z-10">
  
      <!-- Loading text -->
      <div class="space-y-3">
        <div class="flex justify-center items-center">
          <img 
            src="../assets/gifs/loader.gif" 
            alt="Loading..." 
            class="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
        </div>

        <!-- Subtitle -->
        <p class="text-sm md:text-md text-slate-600 animate-fade-in-up delay-500">
          Documenting moments...
        </p>
      </div>
    </div>
  </div>

  <!-- Hero Carousel Section -->
  <section
    v-show="showContent"
    :class="[
      'relative w-full transition-all duration-1000 ease-out overflow-hidden',
      loading ? 'opacity-0' : 'opacity-100'
    ]"
    :style="{ height: dynamicHeight }"
  >
    <!-- Gradient Overlay for better text visibility -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 pointer-events-none"></div>
    
    <!-- Swiper Carousel -->
    <Swiper
      ref="swiperRef"
      :modules="[Autoplay, EffectFade]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :effect="'fade'"
      :fade-effect="{ crossFade: true }"
      :autoplay="{ 
        delay: 3500, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :speed="1500"
      :grab-cursor="true"
      :touch-ratio="1.2"
      :threshold="10"
      :longSwipes="true"
      :longSwipesRatio="0.5"
      :longSwipesMs="300"
      :followFinger="true"
      :allowTouchMove="true"
      :resistance="true"
      :resistance-ratio="0.85"
      class="w-full h-full hero-swiper"
    >
      <SwiperSlide v-for="(img, index) in images" :key="`slide-${index}`">
        <div class="relative w-full h-full overflow-hidden">
          <img 
            :src="img" 
            :alt="`Hero slide ${index + 1}`" 
            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out"
          />
        </div>
      </SwiperSlide>
    </Swiper>
    
    <!-- Scroll Down Indicator -->
    <div 
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-500"
      :style="{ opacity: scrollIndicatorOpacity }"
    >
      <div class="text-white text-sm font-medium mb-3 opacity-90 animate-pulse">
        Scroll to explore
      </div>
      <div class="relative">
        <!-- Mouse outline -->
        <div class="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-wheel"></div>
        </div>
        <!-- Subtle glow effect -->
        <div class="absolute inset-0 w-6 h-10 border border-white/30 rounded-full animate-pulse-glow"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Modern animations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-scale {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
}

@keyframes bounce-modern {
  0%, 80%, 100% { 
    transform: translateY(0) scale(1); 
    opacity: 0.7;
  }
  40% { 
    transform: translateY(-8px) scale(1.1); 
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(10px, -10px) rotate(120deg); }
  66% { transform: translate(-5px, 5px) rotate(240deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-15px, 10px) rotate(-120deg); }
  66% { transform: translate(10px, -5px) rotate(-240deg); }
}

@keyframes float-particle-1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(8px, -12px) scale(1.2); opacity: 1; }
}

@keyframes float-particle-2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(-6px, -8px) scale(1.2); opacity: 1; }
}

@keyframes float-particle-3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(10px, 6px) scale(1.2); opacity: 1; }
}

@keyframes float-particle-4 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(-8px, 10px) scale(1.2); opacity: 1; }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

/* Animation classes */
.animate-spin-slow { animation: spin-slow 3s linear infinite; }
.animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
.animate-bounce-modern { animation: bounce-modern 1.4s ease-in-out infinite; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
.animate-float-particle-1 { animation: float-particle-1 3s ease-in-out infinite; }
.animate-float-particle-2 { animation: float-particle-2 3.5s ease-in-out infinite 0.5s; }
.animate-float-particle-3 { animation: float-particle-3 4s ease-in-out infinite 1s; }
.animate-float-particle-4 { animation: float-particle-4 3.2s ease-in-out infinite 1.5s; }
.animate-gradient-shift { 
  background-size: 200% 200%;
  animation: gradient-shift 3s ease-in-out infinite;
}
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-scroll-wheel { animation: scroll-wheel 2s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

/* Delay utilities */
.delay-0 { animation-delay: 0ms; }
.delay-150 { animation-delay: 150ms; }
.delay-300 { animation-delay: 300ms; }
.delay-500 { animation-delay: 500ms; }

/* Swiper customization */
/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-swiper {
    touch-action: pan-y pinch-zoom;
  }
}
</style>