

import { fetchProducts } from './services/shopify/fetch-products';
import { fetchCategories } from './services/shopify/fetch-categories';
import ProductCard from './components/product/ProductCard';
import CategoryCard from './components/category/CategoryCard';

export const revalidate = 60;

export default async function HomePage() {
  const products = await fetchProducts(); 
  const categories = await fetchCategories(); 

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-5xl font-bold text-center mb-12">Welcome to the Store</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8">Categories</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: any) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}