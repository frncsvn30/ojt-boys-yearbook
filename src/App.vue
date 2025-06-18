<script setup>
import { ref } from 'vue'
import BannerSection from './components/Banner.vue'
import YearbookSection from './components/Yearbook.vue'

const bannerLoaded = ref(false)

const handleBannerLoaded = () => {
  bannerLoaded.value = true
}
</script>

<template>
  <BannerSection @loaded="handleBannerLoaded" />
  <YearbookSection :show="bannerLoaded" />
</template>