import { NextResponse } from 'next/server';
import { fetchWordPressCategories } from '../../services/wordpress/fetch-categories';
import { normalizeWordPressCategories } from '../../../helpers/normalizeData';
import { createShopifyCategory } from '../../services/shopify/create-category';

export async function GET() {
  try {
    // Step 1: Fetch categories from WordPress and save in constant
    const fetchedCategories = await fetchWordPressCategories();
    const categories = [...fetchedCategories]; // Save categories in constant variable

    // Step 2: Normalize categories for Shopify format
    const normalizedCategories = normalizeWordPressCategories(categories);

    // Step 3: Call the Shopify API one by one for each category
    const categoryUploadPromises = normalizedCategories.map(category =>
      createShopifyCategory(category)
    );

    // Wait for all categories to be uploaded
    await Promise.all(categoryUploadPromises);

    return NextResponse.json({ message: 'Categories uploaded successfully' });
  } catch (error) {
    console.error('Error uploading categories:', error);
    return NextResponse.json({ error: 'Failed to upload categories' }, { status: 500 });
  }
}
