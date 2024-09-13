import { NextResponse } from 'next/server'
import {
  uploadCategoriesToShopify,
  uploadProductsToShopify,
} from '@/services/syncWordPressToShopify'

export async function GET() {
  try {
    // Upload categories and products
    await uploadCategoriesToShopify()
    await uploadProductsToShopify()

    // Return a success response
    return NextResponse.json({
      message: 'Categories and Products uploaded successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error uploading categories and products:', error.message)
    } else {
      console.error('Error uploading categories and products:', error)
    }
    return NextResponse.json(
      { error: 'Failed to upload categories and products' },
      { status: 500 },
    )
  }
}
