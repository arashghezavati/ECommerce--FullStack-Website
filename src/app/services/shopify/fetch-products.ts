import shopifyClient from './shopify-client';

export async function fetchProducts() {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string) {
  try {
    const product = await shopifyClient.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

