// import Image from 'next/image'

// interface ProductCardProps {
//   product: any
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <Image
//         src={product.images[0]?.src}
//         alt={product.title}
//         width={500}
//         height={500}
//         className="w-full h-56 object-cover"
//       />
//       <div className="p-6">
//         <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
//         <p className="text-gray-600 mb-4">{product.description}</p>
//         <p className="text-lg font-bold">
//           ${product.variants[0].priceV2.amount}{' '}
//           {product.variants[0].priceV2.currencyCode}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default ProductCard
import Link from 'next/link';

interface ProductCardProps {
  product: any; // You can define the product type more explicitly
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Assuming the first variant is what you're using
  const variantId = product.variants[0].id;

  // Log the variant ID to make sure it's correct
  console.log('Variant ID:', variantId);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.images[0]?.src}
        alt={product.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold">
          ${product.variants[0].priceV2.amount} {product.variants[0].priceV2.currencyCode}
        </p>

        {/* Add the variantId to the checkout URL */}
        <Link href={`/checkout?variantId=${variantId}&price=${product.variants[0].priceV2.amount}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
