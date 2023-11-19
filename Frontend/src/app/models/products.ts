export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  quantityInStock: number;
  createdAt: Date;
}

export interface Item {
  product: Product;
  quantity: number;
}


