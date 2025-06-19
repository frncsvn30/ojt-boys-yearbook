<script setup>
import { useRoute } from 'vue-router'
import BannerSection from './components/Banner.vue'
import YearbookSection from './components/Yearbook.vue'
import { ref } from 'vue'

const route = useRoute()
const bannerLoaded = ref(false)
const handleBannerLoaded = () => {
  bannerLoaded.value = true
}
</script>

<template>
  <div v-if="route.path === '/'">
    <BannerSection @loaded="handleBannerLoaded" />
    <YearbookSection :show="bannerLoaded" />
  </div>

  <router-view v-else />
</template>
