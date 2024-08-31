import client from '../lib/shopify'
import ProductCard from '../components/ProductCard'

interface Product {
  id: string
  title: string
  images: { src: string }[]
  variants: { price: { amount: string } }[]
}

const Home: React.FC = async () => {
  const fetchedProducts: Product[] = await client.product.fetchAll()

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fetchedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.images[0]?.src || ''}
            price={product.variants[0].price.amount}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
