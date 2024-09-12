import { NextResponse } from 'next/server';
import { fetchProducts } from '@/services/shopify/fetch-products';

// Handle GET requests
export async function GET() {
  try {
    const products = await fetchProducts(); // Fetch products from Shopify
    return NextResponse.json(products); // Return products as JSON
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
