export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Item {
  product: Product;
  quantity: number;
}


