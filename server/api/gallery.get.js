import { readdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images')
    const files = await readdir(imagesDir)
    
    // Filter for image files and create URLs
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        url: `/images/${file}`,
        name: file
      }))

    return {
      success: true,
      data: images,
      title: 'Photo Gallery',
      description: 'A collection of images'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to load images'
    }
  }
})