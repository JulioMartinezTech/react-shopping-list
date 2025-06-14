//dependencies
import { useEffect, useState } from "react";

//services
import { fetchProducts } from "../../services/products";
import {
  fetchShoppingList,
  addToShoppingList,
  removeFromShoppingList,
} from "../../services/shoppingList";

//types
import type { Product, ItemList } from "../../types/products";

//css
import "./v-home.css";

//components
import CItemCard from "../../components/c-item-card/c-item-card";
import CSearchBar from "../../components/c-search-bar/c-search-bar";
import CListItem from "../../components/c-list-item/c-list-item";

const VHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<ItemList[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  const deleteItemFromList = async (item_id: number) => {
    try {
      const response = await removeFromShoppingList(item_id);
      setList((prevList) => prevList.filter((item) => item.id !== item_id));
      return response;
    } catch (error) {
      console.error("Error to delete item", error);
    }
  };

  const saveListOnApi = async (product_id: number, quantity: number) => {
    try {
      const result = await addToShoppingList(product_id, quantity);

      setList((prevList) => {
        const index = prevList.findIndex(
          (item) => item.product_id === product_id
        );
        if (index !== -1) {
          const updatedList = [...prevList];
          updatedList[index] = { ...updatedList[index], quantity };
          return updatedList;
        }
        return [...prevList, result];
      });

      return result;
    } catch (error) {
      console.error("Error saving list", error);
      return null;
    }
  };
  // const multiSaveListOnApi = async (data: ItemList[]) => {
  //   try {
  //     const result = await multiAddToShoppingList(data);
  //     return result;
  //   } catch (error) {
  //     console.error("Error saving list", error);
  //   }
  // };

  const validateQuantityForItem = (id: number) => {
    const findItem = list.find((product) => product.product_id === id);
    return findItem?.quantity;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const loadList = async () => {
      try {
        const data = await fetchShoppingList();
        setList(data);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };

    loadProducts();
    loadList();
  }, []);

  return (
    <div className="v-home">
      <CSearchBar showList={() => setShowList((prev) => !prev)} />
      {!showList && (
        <div className="v-home__container">
          {products.map((product) => (
            <CItemCard
              key={product.id}
              img={product.image_url}
              addItemToList={(data) => {
                saveListOnApi(data.product_id, data.quantity);
              }}
              itemQuantity={validateQuantityForItem(product.id) ?? 0}
              id={product.id}
            />
          ))}
        </div>
      )}
      {showList && (
        <div className="v-home__list-container">
          {list.map((item) => {
            const productData = products.find(
              (product) => product.id === item.product_id
            );
            if (!productData) {
              return null;
            }
            return (
              <CListItem
                key={item.product_id}
                id={item.product_id}
                name={productData.name}
                quantity={item.quantity}
                removeItem={() => {
                  deleteItemFromList(item.id);
                }}
              />
            );
          })}
        </div>
      )}
      {/* {showList && (
        <div
          className="c-home__buttom-container"
          onClick={() => saveListOnApi(list)}
        >
          <div className="c-home__buttom">Save list</div>
        </div>
      )} */}
    </div>
  );
};

export default VHome;
