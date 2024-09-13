import Image from 'next/image'

interface CategoryProps {
  category: any
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {category.image && (
        <Image
          src={category.image.src}
          alt={category.title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
        <p className="text-gray-600">{category.description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
