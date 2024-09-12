import { NextResponse } from 'next/server';
import { uploadCategoriesToShopify, uploadProductsToShopify } from '@/app/services/syncWordPressToShopify';

export async function GET() {
  try {
    // Upload categories and products
    await uploadCategoriesToShopify();
    await uploadProductsToShopify();

    // Return a success response
    return NextResponse.json({ message: 'Categories and Products uploaded successfully' });
  } catch (error) {
    console.error('Error uploading categories and products:', error);
    return NextResponse.json({ error: 'Failed to upload categories and products' }, { status: 500 });
  }
}
