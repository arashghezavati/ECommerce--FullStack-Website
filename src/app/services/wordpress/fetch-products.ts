export async function fetchWordPressProducts() {
  const apiUrl = `${process.env.WORDPRESS_API_URL}/products`
  const consumerKey = process.env.WP_CONSUMER_KEY
  const consumerSecret = process.env.WP_CONSUMER_SECRET

  const response = await fetch(
    `${apiUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const products = await response.json()
  return products
}
