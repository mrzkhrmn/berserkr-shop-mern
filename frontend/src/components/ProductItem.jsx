import { Link } from "react-router-dom";

export const ProductItem = () => {
  return (
    <Link
      className="cursor-pointer p-3 hover:-translate-y-2 transition-all duration-200"
      to={"/product/asfsaf"}
    >
      <img
        src="https://cdn.myikas.com/images/20c102e9-75bf-47a9-9605-828b3a311626/30a8b01c-dacb-49ba-8209-0dc3772d82c5/3840/-dsf0252.webp"
        alt="productImage"
        className="max-w-[275px] h-[410px] object-fill"
      />
      <h2 className=" font-semibold mt-2 text-[17px]">Berserkr</h2>
      <p className=" text-[14px] font-light">
        The Berserkr (Deri Kayış Bileklik)
      </p>
      <p className="text-lg font-bold mt-6">₺849.00</p>
      <p className="font-light text-sm">10 Beden</p>
    </Link>
  );
};
