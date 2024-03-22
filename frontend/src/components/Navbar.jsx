import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { Dropdown } from "flowbite-react";

export const Navbar = () => {
  return (
    <header className="bg-black">
      <div className="flex flex-col md:flex-row py-8  items-center container mx-auto gap-6 xl:gap-0">
        <div className="flex flex-1 justify-center ">
          <nav className="mr-auto flex items-center text-md gap-6">
            <Link to={"/"}>Anasayfa</Link>
            <Dropdown label={"Koleksiyonlar"} color={"dark"} inline>
              <Dropdown.Item>The Berserkr</Dropdown.Item>
              <Dropdown.Item>The Ronin</Dropdown.Item>
            </Dropdown>
            <Dropdown label={"Taki"} color={"tranparent"} inline>
              <Dropdown.Item>Bilezikler</Dropdown.Item>
              <Dropdown.Item>Yüzükler</Dropdown.Item>
            </Dropdown>
            <Dropdown label={"Giyim"} color={"tranparent"} inline>
              <Dropdown.Item>T-shirts</Dropdown.Item>
              <Dropdown.Item>Pantolonlar</Dropdown.Item>
            </Dropdown>
          </nav>
        </div>
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">BERSERKR-SHOP</h1>
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex ml-auto items-center text-2xl gap-3">
            <Link>
              <FiSearch />
            </Link>
            <Link>
              <FiUser />
            </Link>
            <Link>
              <FiShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
