export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantityInStock: number;
}

export interface Item {
  product: Product;
  quantity: number;
}


