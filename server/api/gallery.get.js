export default defineEventHandler(async (event) => {
    try {
      // Try to get the content
      const content = await $content('gallery/index').findOne()
      console.log('Content found:', content) // Debug log
      
      return {
        success: true,
        data: content.images || [],
        title: content.title || "My Photo Gallery",
        description: content.description || ""
      }
    } catch (error) {
      console.error('Content error:', error) // Debug log
      
      // Return some hardcoded test data for now
      return {
        success: true,
        data: [
          {
            src: "/images/dummy.webp",
            title: "Test Photo 1",
            alt: "A test photo",
            description: "Testing with dummy.webp",
            tags: ["test"]
          },
          {
            src: "/images/pomocka.png", 
            title: "Test Photo 2",
            alt: "Another test photo",
            description: "Testing with pomocka.png",
            tags: ["test"]
          }
        ],
        message: "Using fallback data"
      }
    }
  })