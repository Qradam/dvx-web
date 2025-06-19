<template>
    <div class="min-h-screen bg-gray-50 p-8">
      <h1 class="text-3xl font-bold text-center mb-8">Photo Gallery</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="image in imageFiles" :key="image" class="aspect-square">
          <img 
            :src="`/images/${image}`" 
            :alt="image"
            class="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { useAsyncData } from '#app'

const imageFiles = ref([])

onMounted(() => {
  // Get all files from the public/images directory
  const context = import.meta.glob('/public/images/*.(jpg|jpeg|png|gif|webp)', { eager: true })
  
  // Extract just the filenames from the full paths
  imageFiles.value = Object.keys(context).map(path => {
    return path.split('/').pop()
  })
})
</script>
  
