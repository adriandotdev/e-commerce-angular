export interface Product {
  id: number;
  name: string;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ICart {
  id: number;
  userId: number;
  products: Array<Product>;
}
