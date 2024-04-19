import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { Dropdown, Avatar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";

export const Navbar = ({ setIsOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      dispatch(logoutSuccess());
      navigate("/login");
      toast.success("Logged Out!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-black">
      <div className="flex flex-col md:flex-row py-8  items-center container mx-auto gap-6 xl:gap-0">
        <div className="flex flex-1 justify-center ">
          <nav className="mr-auto flex items-center text-md gap-6">
            <Link to={"/"}>Anasayfa</Link>

            <Link to={"/taki"}>Taki</Link>
            <Link to={"/giyim"}>Giyim</Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">BERSERKR-SHOP</h1>
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex ml-auto items-center text-2xl gap-4">
            <Link className="px-4">
              <FiSearch />
            </Link>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FiShoppingCart />
            </button>
            {currentUser ? (
              <Dropdown
                color={"transparent"}
                label={
                  <Avatar
                    alt="user"
                    className="block px-0 py-0"
                    img={currentUser.profilePicture}
                    rounded
                  />
                }
                arrowIcon={false}
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                {currentUser.isAdmin && (
                  <Link to={"/dashboard?tab=dashboard"}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                )}
                <Dropdown.Divider />
                <Dropdown.Item>
                  <button type="button" onClick={handleLogout}>
                    Sign Out
                  </button>
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to={"/login"} className="px-4">
                <FiUser />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
