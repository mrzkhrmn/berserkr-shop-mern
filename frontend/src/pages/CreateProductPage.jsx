export const CreateProductPage = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 text-black">
        <input
          className="px-2 py-3"
          type="text"
          placeholder="Brand..."
          id="brand"
        />
        <input
          className="px-2 py-3"
          type="text"
          placeholder="Name..."
          id="name"
        />
        <input
          className="px-2 py-3"
          type="textArea"
          placeholder="Description..."
          id="description"
        />
        <input
          className="px-2 py-3"
          type="number"
          placeholder="Price..."
          id="price"
        />
        <input
          className="px-2 py-3"
          type="number"
          placeholder="Count..."
          id="count"
        />
        <select name="size" id="size" className="text-black px-1 py-2">
          <option value={""} selected hidden>
            Size
          </option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          <span>Images:</span>{" "}
          <span className="font-light">
            The first image will be the cover (max 3 images!)
          </span>
        </p>
        <input type="file" id="images" accept="image/*" multiple />
        <button
          type="button"
          className="px-4 py-3 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300"
        >
          {"Upload"}
        </button>
      </div>
    </div>
  );
};
