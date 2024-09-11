import { NextResponse } from 'next/server';
import { fetchWordPressProducts } from '../../services/wordpress/fetch-products';
import { normalizeWordPressProducts } from '../../../helpers/normalizeData';
import { createShopifyProduct } from '../../services/shopify/create-product';

export async function GET() {
  try {
    const products = await fetchWordPressProducts();
    const normalizedProducts = normalizeWordPressProducts(products);

    // Here, store normalized products in a constant
    const productUploadPromises = normalizedProducts.map(product => 
      createShopifyProduct(product) // Send products one by one
    );

    // Wait for all products to be uploaded
    await Promise.all(productUploadPromises);

    return NextResponse.json({ message: 'Products uploaded successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
