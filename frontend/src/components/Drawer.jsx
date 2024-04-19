import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Drawer = ({ children, isOpen, setIsOpen, length }) => {
  const { itemsPrice } = useSelector((state) => state.cart);
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-100 duration-300 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full px-4">
          <header className="p-4 font-bold text-lg text-black flex justify-between">
            <h2 className="text-black">Sepetim ({length})</h2>
            <button className="" onClick={() => setIsOpen((prev) => !prev)}>
              X
            </button>
          </header>
          {children}
          <p className="text-black">
            <span className="text-black">Toplam: </span>₺
            <span className="text-black font-bold">{itemsPrice}</span>
          </p>
          <Link to={"/cart"} className=" bg-black py-3 text-center">
            Sepete Git
          </Link>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};
