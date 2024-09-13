export async function fetchWordPressProducts() {
  const apiUrl = `${process.env.WORDPRESS_API_URL}/products`
  const consumerKey = process.env.WP_CONSUMER_KEY
  const consumerSecret = process.env.WP_CONSUMER_SECRET

  try {
    const response = await fetch(
      `${apiUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
    )

    if (!response.ok) {
      const errorResponse = await response.json() // Log the error response for more details
      console.error('Error details:', errorResponse)
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error('Failed to fetch WordPress products:', error)
    throw new Error('Error fetching products from WordPress')
  }
}
