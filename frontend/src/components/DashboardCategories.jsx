import { useEffect, useState } from "react";
import { CreateCategory } from "./CreateCategory";

export const DashboardCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getAllCategories() {
      const res = await fetch("/api/category/", { method: "GET" });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setCategories(data);
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
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
