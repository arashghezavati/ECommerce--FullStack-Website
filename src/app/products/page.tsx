// import ProductCard from '@/components/product/ProductCard'

// export default async function ProductsPage() {
//   let products = [];

//   try {
//     // Fetch products from the API route
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products`, {
//       cache: 'no-store', // Ensures fresh data on each request
//     });

//     // Check if the response is okay
//     if (!res.ok) {
//       throw new Error(`Failed to fetch products: ${res.status}`);
//     }

//     // Check content-type to ensure it's JSON
//     const contentType = res.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new Error('Invalid content-type, expected application/json');
//     }

//     // Parse the response data as JSON
//     products = await res.json();
//   } catch (error: any) {
//     console.error('Error fetching products:', error.message);
//   }

//   // Return the UI for displaying the products or a fallback message if there was an error
//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
//       {products.length > 0 ? (
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product: any) => (
//             <li key={product.id}>
//               <ProductCard product={product} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center">No products available or an error occurred while fetching products.</p>
//       )}
//     </div>
//   );
// }

import ProductCard from '@/components/product/ProductCard';

export default async function ProductsPage() {
  // Fetch products from the API route
  const res = await fetch('/api/products', {
    cache: 'no-store',
  });
  const products = await res.json(); // Parse the response data

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
  );
}
