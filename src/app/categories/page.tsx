import { fetchCategories } from '../services/shopify/fetch-categories'
import CategoryCard from '../components/category/CategoryCard'
import ProductCard from '../components/product/ProductCard'

export default async function CategoriesPage() {
  const collections = await fetchCategories()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection: any) => (
          <li key={collection.id}>
            <CategoryCard category={collection} />
          </li>
        ))}
      </ul>
    </div>
  )
}
