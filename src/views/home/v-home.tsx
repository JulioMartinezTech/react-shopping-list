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

const VHome = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      <CSearchBar />
      <div className="v-home__container">
        {products.map((product) => (
          <CItemCard key={product.id} img={product.image_url} />
        ))}
      </div>
      <div className="c-home__buttom-container">
        <div className="c-home__buttom">Agregar a la lista</div>
      </div>
    </div>
  );
};

export default VHome;
