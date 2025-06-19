<script setup>
import { ref, onMounted } from 'vue'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// Fade-in control
const showContent = ref(false)
const loading = ref(true)

// Intro animation control
const showIntro = ref(false)
const introRef = ref(null)

// Force scroll to top function
const scrollToTop = () => {
  // Multiple methods to ensure scroll to top works
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo(0, 0)
  
  // Also try with requestAnimationFrame for better timing
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
}

// Combine onMounted hooks
onMounted(() => {
  // Force scroll to top immediately
  scrollToTop()
  
  // Also scroll to top after a short delay
  setTimeout(() => {
    scrollToTop()
  }, 50)
  
  // Fade in content after slight delay
  setTimeout(() => {
    loading.value = false
    showContent.value = true
    // Ensure we're still at top after content loads
    scrollToTop()
  }, 100)

  // Intersection observer to trigger intro animation
  if (introRef.value) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          showIntro.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(introRef.value)
  }
})

// Gallery images
import g1 from '../assets/img/gallery/ojt-1.jpg'
import g2 from '../assets/img/gallery/ojt-2.jpg'
import g3 from '../assets/img/gallery/ojt-3.jpg'
import g4 from '../assets/img/gallery/ojt-4.jpg'
import g5 from '../assets/img/gallery/ojt-5.jpg'
import g6 from '../assets/img/gallery/ojt-6.jpg'
import g7 from '../assets/img/gallery/ojt-7.jpg'
import g8 from '../assets/img/gallery/ojt-8.jpg'

const gallery = ref([
  { img: g1 },
  { img: g2 },
  { img: g3 },
  { img: g4 },
  { img: g5 },
  { img: g6 },
  { img: g7 },
  { img: g8 },
])

// Students data
import mondray1 from '../assets/img/MONDRAY_01.jpg'
import mondray2 from '../assets/img/MONDRAY_02.jpg'
import carlo1 from '../assets/img/CARLO_01.jpg'
import carlo2 from '../assets/img/CARLO_02.jpg'
import daniel1 from '../assets/img/DANIEL_01.jpg'
import daniel2 from '../assets/img/DANIEL_02.jpg'
import francis1 from '../assets/img/FRANCIS_03.jpg'
import francis2 from '../assets/img/FRANCIS_02.jpg'
import justine1 from '../assets/img/JUSTINE_01.jpg'
import justine2 from '../assets/img/JUSTINE_02.jpg'

const students = ref([
  {
    name: 'Mondray Acio',
    desc: '@dayday.cio',
    img: mondray1,
    imgHover: mondray2,
    currentImg: mondray1,
  },
  {
    name: 'Carlo Pangilinan',
    desc: '@_clysk',
    img: carlo1,
    imgHover: carlo2,
    currentImg: carlo1,
  },
  {
    name: 'Daniel Carlos Chua',
    desc: '@damn.niel_',
    img: daniel1,
    imgHover: daniel2,
    currentImg: daniel1,
  },
  {
    name: 'Francis Loyd Vino',
    desc: '@flvinonovi',
    img: francis1,
    imgHover: francis2,
    currentImg: francis1,
  },
  {
    name: 'Justine David Mesa',
    desc: '@justinedavid_13',
    img: justine1,
    imgHover: justine2,
    currentImg: justine1,
  },

])

// preload imgs
onMounted(() => {
  scrollToTop()

  setTimeout(() => {
    scrollToTop()
  }, 50)

  setTimeout(() => {
    loading.value = false
    showContent.value = true
    scrollToTop()
  }, 100)

  students.value.forEach((student) => {
    const img = new Image()
    img.src = student.imgHover
  })

  if (introRef.value) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          showIntro.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(introRef.value)
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- main Content -->
    <div class="flex-grow">
      <!-- banner -->
      <section class="w-full py-12 sm:py-16 md:py-24 lg:py-32">
        <div
          ref="introRef"
          :class="[
            'max-w-[110rem] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-0 transition-all duration-700 ease-out',
            showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          ]"
        >
          <h1
            class="font-bold md:font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[63px] tracking-tight md:tracking-tighter text-center md:text-left leading-tight"
          >
            OJT Boys — From a simple internship hunt to an unforgettable journey.
            <span class="">Batch 2025.</span>
          </h1>

          <div class="flex justify-center md:justify-end mt-8 md:mt-16">
            <p
              class="md:pr-28 text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left max-w-2xl lg:max-w-4xl text-gray-700"
            >
              Welcome to the archive of the OJT boys who worked hard and made every moment count — through good times
              and tough times, where learning and friendship grew. Faces of strength, growth, and real moments.
            </p>
          </div>
        </div>
      </section>

      <!-- Gallery Section -->
      <section class="w-full sm:py-14 md:py-16">
        <div class="max-w-[110rem] mx-auto px-4 sm:px-6 md:px-10 mb-8 md:mb-16">
          <h1 class="font-bold md:font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl tracking-tight mb-4 md:mb-10 text-center md:text-left">
            Gallery
          </h1>
          <span class="block text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center md:text-left max-w-2xl lg:max-w-3xl text-gray-700 mx-auto md:mx-0">
            We lived these moments. Now, they live here.
          </span>
        </div>

        <Swiper
          ref="swiperRef"
          :modules="[Autoplay]"
          :slides-per-view="'auto'"
          :centered-slides="true"
          :loop="true"
          :looped-slides="gallery.length"
          :watch-slides-visibility="true"
          :watch-slides-progress="true"
          :initial-slide="Math.floor(gallery.length / 2)"
          :space-between="20"
          :autoplay="{ 
            delay: 4000, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
            reverseDirection: false
          }"
          :grab-cursor="true"
          :speed="800"
          :breakpoints="{
            0: { spaceBetween: 10, centeredSlides: true },
            640: { spaceBetween: 15, centeredSlides: true },
            768: { spaceBetween: 20, centeredSlides: true },
            1024: { spaceBetween: 20, centeredSlides: true }
          }"
          class="w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24"
        >
          <SwiperSlide
            v-for="(item, index) in gallery"
            :key="'gallery-' + index"
            class="!w-[85%] sm:!w-[80%] md:!w-[70%] lg:!w-[40%] xl:!w-[30%] 2xl:!w-[25%] transition-all duration-300 ease-in-out"
          >
            <div class="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-lg">
              <img
                :src="item.img"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                :alt="'Gallery Image ' + (index + 1)"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Members Section -->
      <section
        v-show="showContent"
        :class="[
          'w-full py-12 sm:py-16 md:py-24 lg:py-32 transition-all duration-1000 ease-out',
          loading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0',
        ]"
      >
        <div class="max-w-[110rem] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-0">
          <div class="text-center max-w-3xl mx-auto mb-10 md:mb-20">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold md:font-normal tracking-tight mb-4 md:mb-10">
              Graduates of 2025
            </h1>
            <span class="block text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700">
              Years of learning, framed in seconds.
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 text-center">
            <div
              v-for="(student, index) in students"
              :key="index"
              class="flex flex-col items-center mb-5"
            >
              <img
                :src="student.currentImg || student.img"
                @mouseover="student.currentImg = student.imgHover"
                @mouseleave="student.currentImg = student.img"
                class="transition duration-300 h-auto"
                :alt="student.name"
              />
              <h3 class="mt-2 font-semibold text-lg md:text-xl">{{ student.name }}</h3>
              <p class="text-gray-600 text-md max-w-full">{{ student.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="text-center py-4 text-gray-500 text-sm border-t border-gray-200 bg-white">
      <div>
        Developed by <span class="font-semibold text-gray-700">Francis Vino</span>
      </div>
      <div class="mt-2 flex justify-center gap-4 text-gray-500">
        <a href="https://www.linkedin.com/in/francis-loyd-vino-3b5086305/" target="_blank" aria-label="LinkedIn" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-2 transition duration-300">
          <i class="fab fa-linkedin text-lg"></i>
        </a>
        <a href="https://instagram.com/flvinonovi" target="_blank" aria-label="Instagram" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition duration-300">
          <i class="fab fa-instagram text-lg"></i>
        </a>
        <a href="https://facebook.com/flvinonovi" target="_blank" aria-label="Facebook" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-2 transition duration-300">
          <i class="fab fa-facebook text-lg"></i>
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'HeiT ASC Bold', sans-serif;
}
</style>
