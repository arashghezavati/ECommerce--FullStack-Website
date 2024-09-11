import { NextResponse } from 'next/server';
import { fetchWordPressCategories } from '../../services/wordpress/fetch-categories';

export async function GET() {
  try {
    const categories = await fetchWordPressCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error();
  }
}
