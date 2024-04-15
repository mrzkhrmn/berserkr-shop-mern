import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  increaseQuantity,
} from "../redux/cart/cartSlice";
import { FaRegTrashAlt } from "react-icons/fa";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function handleIncreaseQuantity(item) {
    dispatch(increaseQuantity(item));
  }

  function handleDecrementQuantity(item) {
    dispatch(decrementQuantity(item));
  }

  function handleDeleteItem(item) {
    dispatch(deleteItem(item));
  }
  return (
    <div className="border-b border-black pb-4">
      <div className="text-black flex justify-between px-4">
        <img src={item.imageUrls[0]} alt="productImage" className="w-20 h-30" />
        <div className="text-black flex flex-col justify-between">
          <p className="text-black">{item.name}</p>
          <p className="text-black flex items-center  justify-between">
            <span className="text-black/40">Fiyat:</span>
            {item.price}
          </p>
          <p className="text-black flex items-center justify-between">
            <span className="text-black/40">Beden:</span> {item.size}
          </p>
          <div className="text-black flex items-center justify-between">
            <span className="text-black/40">Adet:</span>{" "}
            <div className="text-black flex items-center gap-6">
              <button onClick={() => handleDecrementQuantity(item)}>-</button>{" "}
              {item.quantity}{" "}
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
            </div>
          </div>
        </div>
        <div className="text-black flex flex-col justify-between items-center">
          <button onClick={() => handleDeleteItem(item)}>
            <FaRegTrashAlt color="black" fill="black" />
          </button>
          <p className="text-black">₺{item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};
