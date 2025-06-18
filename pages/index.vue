<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-6xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">My Photo Gallery</h1>
          <p class="text-gray-600 mt-2">A collection of my favorite moments</p>
        </div>
      </header>
  
      <!-- Gallery Grid -->
      <main class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="(image, index) in galleryImages" 
            :key="index"
            class="gallery-item group cursor-pointer"
            @click="openModal(image, index)"
          >
            <div class="aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img 
                :src="image.url" 
                :alt="image.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-900">{{ image.title }}</p>
              <p class="text-xs text-gray-500">{{ image.description }}</p>
            </div>
          </div>
        </div>
  
        <!-- Empty State -->
        <div v-if="galleryImages.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📷</div>
          <h3 class="text-lg font-medium text-gray-900">No photos yet</h3>
          <p class="text-gray-500">Add some photos to get started!</p>
        </div>
      </main>
  
      <!-- Modal -->
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        @click="closeModal"
      >
        <div class="max-w-4xl max-h-full relative" @click.stop>
          <button 
            @click="closeModal"
            class="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
          <img 
            :src="selectedImage.url" 
            :alt="selectedImage.name"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
          <div class="text-white mt-4 text-center">
            <h3 class="text-lg font-semibold">{{ selectedImage.title }}</h3>
            <p class="text-sm text-gray-300">{{ selectedImage.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  useHead({
    title: 'My Photo Gallery',
    meta: [
      { name: 'description', content: 'A beautiful photo gallery showcasing my favorite moments' }
    ]
  })
  
  const selectedImage = ref(null)
  const galleryImages = ref([])
  
  const openModal = (image, index) => {
    selectedImage.value = image
  }
  
  const closeModal = () => {
    selectedImage.value = null
  }
  
  const loadImages = async () => {
    try {
      const response = await $fetch('/api/gallery')
      if (response.success) {
        galleryImages.value = response.data || []
      } else {
        console.error('Failed to load images:', response.error)
        galleryImages.value = []
      }
    } catch (error) {
      console.error('Error loading images:', error)
      galleryImages.value = []
    }
  }
  
  onMounted(() => {
    loadImages()
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })
  })
  </script>