import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: 'arashmusicstore.myshopify.com',
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
})

export default client
