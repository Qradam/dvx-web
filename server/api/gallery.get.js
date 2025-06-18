export default defineEventHandler(async (event) => {
  try {
    console.log('API called - trying to read content...')
    
    // Try different ways to read the content
    let yamlImages = []
    try {
      // Try the exact path
      const content = await $content('gallery').findOne()  // <-- This line goes here
      console.log('Content found:', content)
      yamlImages = content.images || []
      console.log('Images found:', yamlImages)
    } catch (error) {
      console.log('Error reading content:', error)
      
      // Try without /index
      try {
        const content2 = await $content('gallery').findOne()
        console.log('Content found (method 2):', content2)
        yamlImages = content2.images || []
      } catch (error2) {
        console.log('Error reading content (method 2):', error2)
      }
    }

    return {
      success: true,
      data: yamlImages,
      title: "My Photo Gallery",
      description: "A collection of my favorite photos",
      debug: {
        foundImages: yamlImages.length,
        contentPath: 'gallery'
      }
    }
  } catch (error) {
    console.log('API Error:', error)
    return {
      success: false,
      data: [],
      message: "Error loading gallery",
      error: error.message
    }
  }
})