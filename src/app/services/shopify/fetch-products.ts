import shopifyClient from './shopify-client';

// Function to fetch all products
export async function fetchProducts() {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to fetch a single product by its handle (slug)
export async function fetchProductByHandle(handle: string) {
  try {
    const product = await shopifyClient.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

