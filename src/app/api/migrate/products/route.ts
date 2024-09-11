// app/api/migrate/products/route.ts
import { NextResponse } from 'next/server';
import { fetchWordPressProducts } from '../../../services/wordpress/fetch-products';
import { normalizeWordPressProducts } from '@/helpers/normalizeData';
import { createShopifyProduct } from '../../../services/shopify/create-product';

export async function GET() {
  try {
    const wpProducts = await fetchWordPressProducts();

    const normalizedProducts = normalizeWordPressProducts(wpProducts);

    for (const product of normalizedProducts) {
      await createShopifyProduct(product);
    }

    return NextResponse.json({ message: 'Products migrated successfully' });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
