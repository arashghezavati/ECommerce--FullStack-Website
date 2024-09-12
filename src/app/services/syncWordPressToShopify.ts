import { fetchWordPressCategories } from '@/app/services/wordpress/fetch-categories';
import { fetchWordPressProducts } from '@/app/services/wordpress/fetch-products';
import { normalizeWordPressCategories, normalizeWordPressProducts } from '../../helpers/normalizeData';
import { createShopifyCategory } from '@/app/services/shopify/create-category';
import { createShopifyProduct } from '@/app/services/shopify/create-product';

// Function to fetch and upload WooCommerce categories to Shopify
export async function uploadCategoriesToShopify() {
  try {
    const categories = await fetchWordPressCategories();
    const normalizedCategories = normalizeWordPressCategories(categories);

    // Create categories in Shopify
    const categoryUploadPromises = normalizedCategories.map((category) => createShopifyCategory(category));
    await Promise.all(categoryUploadPromises);
    console.log('Categories uploaded successfully');
  } catch (error) {
    console.error('Error uploading categories:', error);
  }
}

// Function to fetch and upload WooCommerce products to Shopify
export async function uploadProductsToShopify() {
  try {
    const products = await fetchWordPressProducts();
    const normalizedProducts = normalizeWordPressProducts(products);

    // Create products in Shopify
    const productUploadPromises = normalizedProducts.map((product) => createShopifyProduct(product));
    await Promise.all(productUploadPromises);
    console.log('Products uploaded successfully');
  } catch (error) {
    console.error('Error uploading products:', error);
  }
}
