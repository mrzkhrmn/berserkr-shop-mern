import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateProduct } from "../components/CreateProduct";
import { DashboardProducts } from "../components/DashboardProducts";
import { DashboardCategories } from "../components/DashboardCategories";

export const DashboardPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromuRL = urlParams.get("tab");
    if (tabFromuRL) {
      setTab(tabFromuRL);
    }
  }, [location.search]);

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
      <div className=" mt-10  max-w-full flex-1">
        {tab === "dashboard" && <h1>dashboard</h1>}
        {tab === "products" && <DashboardProducts />}
        {tab === "categories" && <DashboardCategories />}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
