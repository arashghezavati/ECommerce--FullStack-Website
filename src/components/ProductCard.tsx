import React from 'react'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  title: string
  image: string
  price: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
}) => {
  return (
    <li className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
      )}
      <p className="text-lg font-medium text-gray-700">Price: ${price}</p>
    </li>
  )
}

export default ProductCard
