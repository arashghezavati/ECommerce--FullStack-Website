// app/api/migrate/categories/route.ts
import { NextResponse } from 'next/server';
import { fetchWordPressCategories } from '../../../services/wordpress/fetch-categories';
import { normalizeWordPressCategories } from '@/helpers/normalizeData';
import { createShopifyCategory } from '../../../services/shopify/create-category';

export async function GET() {
  try {
    const wpCategories = await fetchWordPressCategories();

    const normalizedCategories = normalizeWordPressCategories(wpCategories);

    for (const category of normalizedCategories) {
      await createShopifyCategory(category);
    }

    return NextResponse.json({ message: 'Categories migrated successfully' });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
