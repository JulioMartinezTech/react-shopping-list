import api from "./api";

//type
import type { ItemList } from "../types/products";

export const fetchShoppingList = async () => {
  const response = await api.get("/shopping-list/");
  return response.data;
};

export const addToShoppingList = async (product_id: number, quantity = 1) => {
  const response = await api.post("/shopping-list/", {
    product_id: product_id,
    quantity,
  });
  return response.data;
};

export const multiAddToShoppingList = async (props: ItemList[]) => {
  const response = await api.post("/shopping-list/bulk", props);
  return response.data;
};

export const removeFromShoppingList = async (item_id: number) => {
  const response = await api.delete(`/shopping-list/${item_id}`);
  return response.data;
};
