// src/app/services/shopify/fetch-categories.ts

import shopifyClient from './shopify-client';

// Fetch all collections (categories)
export async function fetchCategories() {
  try {
    const collections = await shopifyClient.collection.fetchAll();
    return collections;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
