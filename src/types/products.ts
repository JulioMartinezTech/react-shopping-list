export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export interface ItemList {
  product_id: number;
  id: number;
  quantity: number;
}
