import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Get images from YAML content
    let yamlImages = []
    try {
      const content = await $content('gallery/index').findOne()
      yamlImages = content.images || []
    } catch (error) {
      console.log('No YAML content found, that\'s okay')
    }

    // Get all images from public/images folder
    const imagesDir = path.join(process.cwd(), 'public/images')
    let folderImages = []
    
    try {
      const files = await fs.readdir(imagesDir)
      folderImages = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => {
          // Check if this image is already in YAML with metadata
          const yamlImage = yamlImages.find(img => img.src === `/images/${file}`)
          
          if (yamlImage) {
            return yamlImage // Use YAML data if available
          } else {
            // Auto-generate data for images not in YAML
            return {
              src: `/images/${file}`,
              title: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '), // Remove extension and replace - _ with spaces
              alt: `Photo: ${file}`,
              description: "Uploaded photo",
              tags: ["uploaded"]
            }
          }
        })
    } catch (error) {
      console.log('Could not read images directory:', error)
    }

    // Combine and deduplicate images
    const allImages = folderImages

    return {
      success: true,
      data: allImages,
      title: "My Photo Gallery",
      description: "A collection of my favorite photos"
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Error loading gallery"
    }
  }
})