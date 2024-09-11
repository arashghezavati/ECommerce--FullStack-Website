import { WPCategory, WPProduct } from '@/types/wp-product';

export function normalizeWordPressCategories(categories: WPCategory[]): any[] {
  return categories.map((category) => ({
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    parent: category.parent || 0, // Ensure it's a top-level category if no parent
  }));
}

export function normalizeWordPressProducts(products: WPProduct[]): any[] {
  return products.map((product) => ({
    title: product.name,
    body_html: product.description || '',
    vendor: product.vendor || 'Default Vendor',
    product_type: product.categories[0]?.name || 'Uncategorized',
    price: product.price || 0,
    images: product.images.map((image) => ({ src: image.src })),
    variants: [{ price: product.price }],
  }));
}
