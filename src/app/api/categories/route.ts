import { NextResponse } from 'next/server';
import { fetchWordPressCategories } from '../../services/wordpress/fetch-categories';
import { normalizeWordPressCategories } from '../../../helpers/normalizeData';
import { createShopifyCategory } from '../../services/shopify/create-category';

export async function GET() {
  try {
    const fetchedCategories = await fetchWordPressCategories();
    const categories = [...fetchedCategories];

    const normalizedCategories = normalizeWordPressCategories(categories);

    const categoryUploadPromises = normalizedCategories.map(category =>
      createShopifyCategory(category)
    );

    await Promise.all(categoryUploadPromises);

    return NextResponse.json({ message: 'Categories uploaded successfully' });
  } catch (error) {
    console.error('Error uploading categories:', error);
    return NextResponse.json({ error: 'Failed to upload categories' }, { status: 500 });
  }
}
