import { NextResponse } from 'next/server'
import { fetchCategories } from '@/services/shopify/fetch-categories'

// Handle GET requests for categories
export async function GET() {
  try {
    const categories = await fetchCategories() // Fetch categories from Shopify
    return NextResponse.json(categories) // Return categories as JSON
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}
