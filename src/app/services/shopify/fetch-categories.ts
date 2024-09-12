
import shopifyClient from './shopify-client';

export async function fetchCategories() {
  try {
    const collections = await shopifyClient.collection.fetchAll();
    return collections;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
