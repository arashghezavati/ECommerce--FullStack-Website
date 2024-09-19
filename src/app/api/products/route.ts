// import { NextResponse } from 'next/server'
// import { fetchProducts } from '@/services/shopify/fetch-products'

// export async function GET() {
//   try {
//     const products = await fetchProducts()
//     return NextResponse.json(products)
//   } catch (error) {
//     console.error('Failed to fetch products:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch products' },
//       { status: 500 },
//     )
//   }
// }
import { NextResponse } from 'next/server';
import { fetchProducts } from '@/services/shopify/fetch-products';

export async function GET() {
  try {
    console.log('Fetching products from Shopify API...');
    const products = await fetchProducts();

    // Check if products exist
    if (!products || products.length === 0) {
      console.error('No products found');
      return NextResponse.json({ error: 'No products available' }, { status: 404 });
    }

    console.log('Products fetched successfully:', products);
    return NextResponse.json(products); // Return products as JSON
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
