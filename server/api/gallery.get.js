import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Get existing YAML content
    let existingContent = {
      title: "My Photo Gallery",
      description: "A collection of my favorite photos",
      images: []
    }
    
    try {
      const content = await queryContent('gallery').findOne()
      if (content) {
        existingContent = content
      }
    } catch (error) {
      console.log('No existing YAML found, will create one')
    }

    // Scan the images directory
    const imagesDir = path.join(process.cwd(), 'public/images')
    let actualFiles = []
    
    try {
      const files = await fs.readdir(imagesDir)
      actualFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    } catch (error) {
      console.log('Could not read images directory:', error)
      actualFiles = []
    }

    // Create updated images array
    const updatedImages = actualFiles.map(filename => {
      // Check if this file already has metadata in YAML
      const existingImage = existingContent.images?.find(img => 
        img.src === `/images/${filename}` || img.src.endsWith(filename)
      )

      if (existingImage) {
        return existingImage // Keep existing metadata
      } else {
        // Generate new metadata for new files
        return {
          src: `/images/${filename}`,
          title: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
          alt: `Photo: ${filename}`,
          description: "Auto-added photo",
          tags: ["auto-detected"]
        }
      }
    })

    // Update the YAML file if there are changes
    if (JSON.stringify(updatedImages) !== JSON.stringify(existingContent.images)) {
      try {
        const yamlContent = `title: "${existingContent.title}"
description: "${existingContent.description}"
images:${updatedImages.map(img => `
  - src: "${img.src}"
    title: "${img.title}"
    alt: "${img.alt}"
    description: "${img.description}"
    tags: [${img.tags.map(tag => `"${tag}"`).join(', ')}]`).join('')}
`
        
        const yamlPath = path.join(process.cwd(), 'content/gallery.yml')
        await fs.writeFile(yamlPath, yamlContent)
        console.log('Updated gallery.yml with', updatedImages.length, 'images')
      } catch (writeError) {
        console.log('Could not write YAML file:', writeError)
      }
    }

    return {
      success: true,
      data: updatedImages,
      title: existingContent.title,
      description: existingContent.description
    }
  } catch (error) {
    console.log('API Error:', error)
    return {
      success: false,
      data: [],
      message: "Error loading gallery"
    }
  }
})