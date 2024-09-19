import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex justify-end space-x-4 p-4 bg-gray-100">
      {/* <Link href="/categories" className="text-lg font-semibold">
        Categories
      </Link>
      <Link href="/products" className="text-lg font-semibold">
        Products
      </Link> */}
      <Link href="/checkout" className="text-lg font-semibold">
        Checkout
      </Link>
    </nav>
  )
}
