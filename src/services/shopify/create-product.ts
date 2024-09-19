export async function createShopifyProduct(product: any) {
  const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2024-07/products.json`
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN

  const existingProduct = await checkIfProductExists(product.handle)
  if (existingProduct) {
    console.log(
      `Product with handle "${product.handle}" already exists. Skipping creation.`,
    )
    return existingProduct
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken as string,
    },
    body: JSON.stringify({
      product: {
        title: product.title,
        body_html: product.body_html,
        vendor: product.vendor,
        product_type: product.product_type,
        images: product.images,
        variants: product.variants,
      },
    }),
  })

  if (!response.ok) {
    const errorResponse = await response.json()
    console.error('Error creating product:', errorResponse)
    throw new Error(`Failed to create product: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

async function checkIfProductExists(handle: string) {
  const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2024-07/products.json?handle=${handle}`
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken as string,
    },
  })

  if (!response.ok) {
    const errorResponse = await response.json()
    console.error('Error checking product existence:', errorResponse)
    return null
  }

  const data = await response.json()
  return data.products.length > 0 ? data.products[0] : null
}
