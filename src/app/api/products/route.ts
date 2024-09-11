import { NextResponse } from 'next/server';
import { fetchWordPressProducts } from '../../services/wordpress/fetch-products';

export async function GET() {
  try {
    const products = await fetchWordPressProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
}
