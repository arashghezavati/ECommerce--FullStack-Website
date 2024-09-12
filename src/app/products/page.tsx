import { fetchProducts } from '../services/shopify/fetch-products'
import ProductCard from '../components/product/ProductCard'

export default async function ProductsPage() {
  const products = await fetchProducts()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
