export async function fetchWordPressCategories() {
  const apiUrl = `${process.env.WORDPRESS_API_URL}/products/categories`;
  const consumerKey = process.env.WP_CONSUMER_KEY;
  const consumerSecret = process.env.WP_CONSUMER_SECRET;

  const response = await fetch(`${apiUrl}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const categories = await response.json();
  return categories;
}
