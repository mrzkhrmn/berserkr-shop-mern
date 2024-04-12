import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardProducts } from "../components/DashboardProducts";
import { DashboardCategories } from "../components/DashboardCategories";
import { setCategories } from "../redux/category/categorySlice";
import { setProducts } from "../redux/products/productSlice";
import { Dashboard } from "../components/Dashboard";

export const DashboardPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromuRL = urlParams.get("tab");
    if (tabFromuRL) {
      setTab(tabFromuRL);
    }

    async function getAllCategories() {
      const res = await fetch("/api/category/", { method: "GET" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      dispatch(setCategories(data));
    }
    async function getAllProducts() {
      const res = await fetch("/api/product/", { method: "GET" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      dispatch(setProducts(data));
    }
    async function getAllUsers() {
      const res = await fetch("/api/user/", { method: "GET" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setLastMonthUsers(data.lastMonthUsers);
    }
    getAllCategories();
    getAllProducts();
    getAllUsers();
  }, [location.search, dispatch]);

  return currentUser.isAdmin ? (
    <div className="min-h-screen container flex">
      <div className=" max-w-[12rem] bg-black p-6">
        <div className="flex flex-col gap-2">
          <Link
            to={"/dashboard?tab=dashboard"}
            className="text-center hover:bg-white/20 py-4 px-6 rounded-md transition duration-200"
          >
            Dashboard
          </Link>
          <Link
            to={"/dashboard?tab=products"}
            className="text-center hover:bg-white/20 py-4 rounded-md transition duration-200"
          >
            <div>Products</div>
          </Link>
          <Link
            to={"/dashboard?tab=categories"}
            className="text-center hover:bg-white/20 py-4 rounded-md transition duration-200"
          >
            <div>Categories</div>
          </Link>
        </div>
      </div>
      <div className=" mt-10  flex-1 items-center mx-auto">
        {tab === "dashboard" && (
          <Dashboard
            users={users}
            totalUsers={totalUsers}
            lastMonthUsers={lastMonthUsers}
          />
        )}
        {tab === "products" && <DashboardProducts />}
        {tab === "categories" && <DashboardCategories />}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
