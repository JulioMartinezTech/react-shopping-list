import api from "./api";

export const fetchShoppingList = async () => {
  const response = await api.get("/shopping-list/");
  return response.data;
};

export const addToShoppingList = async (productId: number, quantity = 1) => {
  const response = await api.post("/shopping-list/", {
    product_id: productId,
    quantity,
  });
  return response.data;
};

export const removeFromShoppingList = async (id: number) => {
  await api.delete(`/shopping-list/${id}`);
};
