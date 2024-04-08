import { useState } from "react";
import { toast } from "react-toastify";

export const CreateCategory = ({ categories, setCategories }) => {
  const [nameData, setNameData] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/category/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameData }),
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setLoading(false);
      setCategories([data, ...categories]);
      setNameData("");
      toast.success("Category Created!");
    } catch (error) {
      setNameData("");
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center  items-center gap-4"
    >
      <div className="flex flex-col gap-4 text-black">
        <div className="flex items-center gap-4">
          <input
            className="px-2 py-3 text-black"
            type="text"
            placeholder="Name..."
            value={nameData}
            onChange={(e) => setNameData(e.target.value)}
          />
        </div>
      </div>
      <button
        disabled={loading}
        className="px-4 py-3 border border-white  hover:bg-white/10  transition duration-300"
      >
        Create Category
      </button>
    </form>
  );
};
