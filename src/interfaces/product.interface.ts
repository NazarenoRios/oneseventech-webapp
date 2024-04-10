export interface Product {
  id: string
  title: string
  image: string
  price: number
}

export class Product {
  constructor(productData: Product) {
    this.id = productData.id
    this.title = productData.title
    this.price = productData.price
    this.image = productData.image
  }
}
