export async function createShopifyCategory(category: any) {
  const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/custom_collections.json`
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken as string,
    },
    body: JSON.stringify({
      custom_collection: {
        title: category.name,
        body_html: category.description,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create category: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}
