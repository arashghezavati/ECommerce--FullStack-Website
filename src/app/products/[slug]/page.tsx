import { fetchProductByHandle } from '../../services/shopify/fetch-products';

async function fetchProduct(handle: string) {
  const product = await fetchProductByHandle(handle);

  return JSON.parse(JSON.stringify(product));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images[0]?.src} alt={product.title} width={300} />
      <p>{product.description}</p>
      <p>Price: ${product.variants[0].priceV2.amount} {product.variants[0].priceV2.currencyCode}</p>
    </div>
  );
}
