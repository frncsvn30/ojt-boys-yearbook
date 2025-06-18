<script setup>
import { ref, onMounted } from 'vue'

// show content with fade-in
const showContent = ref(false)
const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        showContent.value = true
    }, 100)
})

// intro animation control
const showIntro = ref(false)
const introRef = ref(null)

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            if (entries[0].isIntersecting) {
                showIntro.value = true
                observer.disconnect()
            }
        },
        { threshold: 0.1 }
    )
    if (introRef.value) observer.observe(introRef.value)
})

// grad imgs
import mondray1 from '../assets/img/MONDRAY_01.jpg'
import mondray2 from '../assets/img/MONDRAY_02.jpg'
import carlo1 from '../assets/img/CARLO_01.jpg'
import carlo2 from '../assets/img/CARLO_02.jpg'
import daniel1 from '../assets/img/DANIEL_01.jpg'
import daniel2 from '../assets/img/DANIEL_02.jpg'
import francis1 from '../assets/img/FRANCIS_01 (1).jpg'
import francis2 from '../assets/img/FRANCIS_02.jpg'

const students = ref([
    {
        name: 'Mondray Acio',
        desc: 'Description 1',
        img: mondray1,
        imgHover: mondray2,
        currentImg: mondray1
    },
    {
        name: 'Carlo Pangilinan',
        desc: 'Description 2',
        img: carlo1,
        imgHover: carlo2,
        currentImg: carlo1
    },
    {
        name: 'Daniel Carlos Chua',
        desc: 'Description 3',
        img: daniel1,
        imgHover: daniel2,
        currentImg: daniel1
    },
    {
        name: 'Francis Loyd Vino',
        desc: 'Description 4',
        img: francis1,
        imgHover: francis2,
        currentImg: francis1
    },
    {
        name: 'Mondray Acio',
        desc: 'Description 1',
        img: mondray1,
        imgHover: mondray2,
        currentImg: mondray1
    },
    {
        name: 'Carlo Pangilinan',
        desc: 'Description 2',
        img: carlo1,
        imgHover: carlo2,
        currentImg: carlo1
    },
    {
        name: 'Daniel Carlos Chua',
        desc: 'Description 3',
        img: daniel1,
        imgHover: daniel2,
        currentImg: daniel1
    },
    {
        name: 'Francis Loyd Vino',
        desc: 'Description 4',
        img: francis1,
        imgHover: francis2,
        currentImg: francis1
    },
    {
        name: 'Mondray Acio',
        desc: 'Description 1',
        img: mondray1,
        imgHover: mondray2,
        currentImg: mondray1
    },
    {
        name: 'Carlo Pangilinan',
        desc: 'Description 2',
        img: carlo1,
        imgHover: carlo2,
        currentImg: carlo1
    },
    {
        name: 'Daniel Carlos Chua',
        desc: 'Description 3',
        img: daniel1,
        imgHover: daniel2,
        currentImg: daniel1
    },
    {
        name: 'Francis Loyd Vino',
        desc: 'Description 4',
        img: francis1,
        imgHover: francis2,
        currentImg: francis1
    },

])
</script>

<template>
    <!-- Full width black bg section outside the max-width container -->
    <div class="w-full bg-[#0D0D0D] py-[20rem]">
        <div ref="introRef" :class="[
            'max-w-[60rem] mx-auto px-6 sm:px-8 text-center transition-opacity transition-transform duration-700 ease-out',
            showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8">
                Graduates of 2025
            </h1>
            <p class="text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed">
                Welcome to the archive of the OJT boys who worked hard and made every moment count — through good times
                and tough times, where learning and friendship grew. Faces of strength, growth, and real moments.
            </p>
        </div>
    </div>

    <!-- Then your main content section with max width -->
    <section v-show="showContent" :class="[
        'max-w-[100rem] px-4 mx-auto mt-10 md:mt-20 transition-all duration-1000 ease-out',
        loading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
    ]">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 text-center">
            <div v-for="(student, index) in students" :key="index" class="flex flex-col items-center mb-5">
                <img :src="student.currentImg || student.img" @mouseover="student.currentImg = student.imgHover"
                    @mouseleave="student.currentImg = student.img" class="transition duration-300"
                    :alt="student.name" />
                <h3 class="mt-2 font-semibold text-lg md:text-xl px-2">{{ student.name }}</h3>
                <p class="text-gray-600 text-md px-4 max-w-full">{{ student.desc }}</p>
            </div>
        </div>
    </section>

</template>

<style scoped>
/* No additional CSS needed because animation uses Tailwind utilities */
</style>
