import { useEffect, useState } from "react";
import { CreateCategory } from "./CreateCategory";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/category/categorySlice";

export const DashboardCategories = () => {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  async function handleDelete(id) {
    if (window.confirm("Are you sure to delete this category?")) {
      try {
        const res = await fetch(`/api/category/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          toast.error(data.error);
          return;
        }
        dispatch(
          setCategories(categories.filter((category) => category._id !== id))
        );
        toast.success("Category Deleted!");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  }
  useEffect(() => {
    async function getAllCategories() {
      const res = await fetch("/api/category/", { method: "GET" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      if (data) {
        dispatch(setCategories(data));
      }
    }
    getAllCategories();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <CreateCategory setCategories={setCategories} categories={categories} />
      <div className="flex items-center gap-4 justify-center">
        {categories.map((category, index) => (
          <button
            className="px-4 py-2 border border-white hover:bg-white/15"
            key={index}
            onClick={() => handleDelete(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
