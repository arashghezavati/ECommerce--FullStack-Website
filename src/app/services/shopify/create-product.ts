export async function createShopifyProduct(product: any) {
    const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/products.json`;
    const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
  
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
    });
  
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  }
  