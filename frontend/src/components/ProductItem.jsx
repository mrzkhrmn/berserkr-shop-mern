import { Link, useLocation } from "react-router-dom";

export const ProductItem = ({ product }) => {
  const location = useLocation();

  return (
    <Link
      className="cursor-pointer p-3 hover:-translate-y-2 transition-all duration-200"
      to={`/product/${product._id}`}
    >
      <img
        src={product.imageUrls[0]}
        alt="productImage"
        className="max-w-[275px] h-[410px] object-fill"
      />
      <h2 className=" font-semibold mt-2 text-[17px]">{product.brand}</h2>
      <p className=" text-[14px] font-light">{product.name}</p>
      <p className="text-lg font-bold mt-6">₺{product.price}</p>
      {location.pathname.includes("giyim") ? (
        <p className="font-light text-sm">10 Beden</p>
      ) : (
        <p className="font-light text-sm">Standart Beden</p>
      )}
    </Link>
  );
};
