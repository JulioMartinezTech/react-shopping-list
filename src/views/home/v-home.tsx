//dependencies
import { useEffect, useState } from "react";

//services
import { fetchProducts } from "../../services/products";

//types
import type { Product } from "../../types/products";

//css
import "./v-home.css";

//components
import CItemCard from "../../components/c-item-card/c-item-card";
import CSearchBar from "../../components/c-search-bar/c-search-bar";
import CListItem from "../../components/c-list-item/c-list-item";

//interfaces
interface ItemList {
  id: number;
  quantity: number;
}

const VHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<ItemList[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  const deleteItemFromList = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const addToList = (data: ItemList) => {
    const dataList = list ? [...list] : [];
    const index = dataList.findIndex((item) => item.id === data.id);

    if (index !== -1) {
      if (data.quantity === 0) {
        deleteItemFromList(data.id);
      } else {
        dataList[index] = { ...dataList[index], quantity: data.quantity };
      }
    } else {
      dataList.push(data);
    }

    setList(dataList);
    console.log(dataList);
  };

  const validateQuantityForItem = (id: number) => {
    const findItem = list.find((product) => product.id === id);
    return findItem?.quantity;
  };

  // const showListView = () => {
  //   console.log("click");
  //   setShowList(true);
  // };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
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
                addToList(data);
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
              (product) => product.id === item.id
            );
            if (!productData) {
              return null;
            }
            return (
              <CListItem
                key={item.id}
                id={item.id}
                name={productData.name}
                quantity={item.quantity}
                removeItem={(id) => {
                  deleteItemFromList(id);
                }}
              />
            );
          })}
        </div>
      )}
      {showList && (
        <div className="c-home__buttom-container">
          <div className="c-home__buttom">Save list</div>
        </div>
      )}
    </div>
  );
};

export default VHome;
