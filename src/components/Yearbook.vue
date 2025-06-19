<script setup>
import { ref, onMounted } from 'vue'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const showContent = ref(false)
const loading = ref(true)
const showIntro = ref(false)
const introRef = ref(null)

// track hovered student index
const studentHover = ref(null)

const scrollToTop = () => {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo(0, 0)
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
}

// gallery pics
import g1 from '../assets/img/gallery/ojt-1.jpg'
import g2 from '../assets/img/gallery/ojt-2.jpg'
import g3 from '../assets/img/gallery/ojt-3.jpg'
import g4 from '../assets/img/gallery/ojt-4.jpg'
import g5 from '../assets/img/gallery/ojt-5.jpg'
import g6 from '../assets/img/gallery/ojt-6.jpg'
import g7 from '../assets/img/gallery/ojt-7.jpg'
import g8 from '../assets/img/gallery/ojt-8.jpg'

const gallery = ref([
  { img: g1 }, { img: g2 }, { img: g3 }, { img: g4 },
  { img: g5 }, { img: g6 }, { img: g7 }, { img: g8 },
])

// grad pics
import mondray1 from '../assets/img/MONDRAY_01.jpg'
import mondray2 from '../assets/img/MONDRAY_02.jpg'
import carlo1 from '../assets/img/CARLO_01.jpg'
import carlo2 from '../assets/img/CARLO_02.jpg'
import daniel1 from '../assets/img/DANIEL_01.JPG'
import daniel2 from '../assets/img/DANIEL_02.JPG'
import francis1 from '../assets/img/FRANCIS_03.jpg'
import francis2 from '../assets/img/FRANCIS_02.jpg'
import justine1 from '../assets/img/JUSTINE_01.jpg'
import justine2 from '../assets/img/JUSTINE_02.jpg'

const students = ref([
  { name: 'Mondray Acio', 
    desc: '@dayday.cio', 
    img: mondray1, 
    imgHover: mondray2,
    link: 'https://instagram.com/dayday.cio' 
  },
  { name: 'Carlo Pangilinan', 
    desc: '@_clysk', 
    img: carlo1, 
    imgHover: carlo2,
    link: 'https://instagram.com/_clysk' 
  },
  { name: 'Daniel Carlos Chua', 
    desc: '@damn.niel_', 
    img: daniel1, 
    imgHover: daniel2,
    link: 'https://instagram.com/damn.niel_'  
  },
  { name: 'Francis Loyd Vino', 
    desc: '@flvinonovi', 
    img: francis1, 
    imgHover: francis2,
    link: 'https://instagram.com/flvinonovi'  
  },
  { name: 'Justine David Mesa', 
    desc: '@justinedavid_13', 
    img: justine1, 
    imgHover: justine2,
    link: 'https://instagram.com/justinedavid_13'  
  },
])

onMounted(() => {
  scrollToTop()
  setTimeout(scrollToTop, 50)
  setTimeout(() => {
    loading.value = false
    showContent.value = true
    scrollToTop()
  }, 100)

  // preload hover images
  students.value.forEach((s) => {
    const img = new Image()
    img.src = s.imgHover
  })

  if (introRef.value) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        showIntro.value = true
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(introRef.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white antialiased">
    <!-- hero section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto py-20 sm:py-24 lg:py-32">
        <div ref="introRef" :class="['transition-all duration-1200 ease-out', showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']">
          <div class="text-center space-y-8 sm:space-y-10 lg:space-y-12">
            <div class="space-y-3 sm:space-y-4">
              <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[-0.02em] text-black leading-[0.9]">
                OJT Boys
              </h1>
              <div class="w-px h-8 sm:h-12 lg:h-16 my-8 bg-black mx-auto"></div>
              <p class="text-lg sm:text-xl md:text-2xl font-light text-gray-800 tracking-wide px-4">
                From internship hunt to new beginnings.
              </p>
            </div>
            <div class="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4">
              <p class="text-sm sm:text-base md:text-lg text-gray-600 font-light leading-relaxed">
                Archive of dedication, growth, and friendship — where learning transformed into lasting memories.
              </p>
              <div class="text-xs sm:text-sm text-gray-400 font-light tracking-widest uppercase">
                Batch 2025
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div class="w-px h-8 sm:h-12 bg-gray-300"></div>
      </div>
    </section>

    <!-- gallery -->
    <section class="py-16 sm:py-24 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 sm:mb-16 lg:mb-20">
          <div class="flex items-center gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            <div class="w-8 sm:w-10 lg:w-12 h-px bg-black"></div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-light text-black tracking-tight">Gallery</h2>
          </div>
          <p class="text-sm sm:text-base text-gray-600 font-light ml-12 sm:ml-16 lg:ml-20 pr-4">
            Moments that shaped our journey
          </p>
        </div>
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :centered-slides="true"
          :loop="true"
          :looped-slides="gallery.length"
          :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }"
          :grab-cursor="true"
          :speed="1000"
          :breakpoints="{ 768: { slidesPerView: 'auto', spaceBetween: 24 }, 1024: { slidesPerView: 'auto', spaceBetween: 32 } }"
          :space-between="16"
          class="w-full"
        >
          <SwiperSlide v-for="(item, index) in gallery" :key="index" class="md:!w-[70%] lg:!w-[55%] xl:!w-[40%] 2xl:!w-[32%]">
            <div class="group relative overflow-hidden bg-gray-100 aspect-[3/4]">
              <img
                :src="item.img"
                loading="lazy"
                class="w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.02] grayscale-[0.2] group-hover:grayscale-0"
                :alt="`Gallery image ${index + 1}`"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <!-- OJT members -->
    <section
      v-show="showContent"
      :class="['py-16 sm:py-24 lg:py-32 bg-white transition-all duration-1200 ease-out', loading ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0']"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16 sm:mb-20 lg:mb-24">
          <div class="flex items-center gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            <div class="w-8 sm:w-10 lg:w-12 h-px bg-black"></div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-light text-black tracking-tight">Graduates of 2025</h2>
          </div>
          <p class="text-sm sm:text-base text-gray-600 font-light ml-12 sm:ml-16 lg:ml-20 pr-4">
            Years of learning, captured in moments
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          <div
            v-for="(student, index) in students"
            :key="index"
            class="group"
            @mouseenter="studentHover = index"
            @mouseleave="studentHover = null"
            @touchstart.prevent="studentHover = index"
            @touchend.prevent="studentHover = null"
          >
            <div class="relative mb-4 sm:mb-6 lg:mb-8 overflow-hidden bg-gray-100 aspect-[3/4]">
              <img
                :src="studentHover === index ? student.imgHover : student.img"
                class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] grayscale-[0.1] group-hover:grayscale-0"
                :alt="student.name"
              />
              <div class="absolute inset-0 bg-black/3 group-hover:bg-black/0 transition-all duration-500"></div>
            </div>
            <div class="space-y-2 sm:space-y-3 text-center sm:text-left">
              <h3 class="text-base sm:text-lg font-light text-black tracking-tight">{{ student.name }}</h3>
              <!-- <p class="text-xs sm:text-sm text-gray-500 font-light tracking-wide">{{ student.desc }}</p> -->

              <a
                :href="student.link"
                target="_blank"
                class="text-xs sm:text-sm text-gray-500 font-light tracking-wide hover:underline"
              >
                {{ student.desc }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <footer class="bg-black text-white py-12 sm:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center space-y-8 sm:space-y-10 lg:space-y-12">
          <div class="text-center">
            <p class="text-xs sm:text-sm font-light text-gray-400 mb-2">
              Developed by
            </p>
            <p class="text-sm sm:text-base font-light text-white tracking-wide">
              Francis Vino
            </p>
          </div>
          <div class="w-8 sm:w-10 lg:w-12 h-px bg-gray-800"></div>
          <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
            <a
              href="https://www.linkedin.com/in/francis-loyd-vino-3b5086305/"
              target="_blank"
              aria-label="LinkedIn"
              class="group flex items-center gap-3 text-xs sm:text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
            >
              <i class="fab fa-linkedin text-sm sm:text-base"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://instagram.com/flvinonovi"
              target="_blank"
              aria-label="Instagram"
              class="group flex items-center gap-3 text-xs sm:text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
            >
              <i class="fab fa-instagram text-sm sm:text-base"></i>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/flvinonovi"
              target="_blank"
              aria-label="Facebook"
              class="group flex items-center gap-3 text-xs sm:text-sm font-light text-gray-400 hover:text-white transition-colors duration-300"
            >
              <i class="fab fa-facebook text-sm sm:text-base"></i>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

h1, h2 {
  font-family: 'HeiT ASC Bold', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* selection styling */
::selection {
  background-color: #000;
  color: #fff;
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #333;
}


</style>
