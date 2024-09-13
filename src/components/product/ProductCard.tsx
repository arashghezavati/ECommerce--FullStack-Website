import Image from 'next/image'

interface ProductCardProps {
  product: any
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image
        src={product.images[0]?.src}
        alt={product.title}
        width={500}
        height={500}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold">
          ${product.variants[0].priceV2.amount}{' '}
          {product.variants[0].priceV2.currencyCode}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
