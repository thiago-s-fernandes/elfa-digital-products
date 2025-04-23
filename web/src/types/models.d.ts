export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string | null;
  brand: Brand;
}
