import client from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  variants: { price: { amount: string } }[];
}


export const dynamic = 'force-dynamic';
export const revalidate = 0; 

const Home: React.FC = async () => {
  try {
    console.log('Request to fetch Shopify products initiated...');

    const fetchedProducts: any[] = await client.product.fetchAll();


    const products: Product[] = fetchedProducts.map((product: any) => ({
      id: product.id.toString(), 
      title: product.title.toString(), 
      images: product.images.map((img: any) => ({ src: img.src })),
      variants: product.variants.map((variant: any) => ({
        price: {
          amount: variant.price.amount.toString() || 'N/A', 
        },
      })),
    }));

    console.log('Extracted products:', products);

    return (
      <div className="container mx-auto py-8 px-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Products</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
    );
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);

    return (
      <p className="text-center text-red-500">
        Error fetching products. Please try again later.
      </p>
    );
  }
}

export default Home;



