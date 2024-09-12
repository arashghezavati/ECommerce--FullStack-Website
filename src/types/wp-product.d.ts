export interface WPProduct {
  name: string
  description: string
  vendor: string
  price: string
  images: { src: string }[]
  categories: { name: string }[]
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number | null
}
