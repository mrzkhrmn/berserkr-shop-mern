import { ProductItem } from "../components/ProductItem";

export const JewelryPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-16">TAKI</h1>
      <div className="flex justify-center flex-wrap">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};
