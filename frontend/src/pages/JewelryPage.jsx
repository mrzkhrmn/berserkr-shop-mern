import { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";

export const JewelryPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getJewelryProducts() {
      try {
        const res = await fetch(`/api/product/taki`, { method: "GET" });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getJewelryProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-16">TAKI</h1>
      <div className="flex justify-center flex-wrap">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
