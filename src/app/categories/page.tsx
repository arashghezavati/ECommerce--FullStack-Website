import CategoryCard from '@/components/category/CategoryCard';
import { fetchCategories } from '@/services/shopify/fetch-categories'


export default async function CategoriesPage() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/categories`, {
  //   cache: 'no-store',
  // })
  const res = await fetchCategories();
  const categories = await res.json() 
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category: any) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </div>
  )
}
