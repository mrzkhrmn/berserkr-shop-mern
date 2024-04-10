import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/products/productSlice";

export const CreateProduct = () => {
  const { products } = useSelector((state) => state.product);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
  const dispatch = useDispatch();

  function handleImageSubmit() {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 3 images per listing");
      setUploading(false);
    }
  }

  function handleRemoveImage(index) {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
            resolve(downLoadURL);
          });
        }
      );
    });
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/product/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }
      toast.success("Product created");
      dispatch(setProducts([data, ...products]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  console.log(formData);

  return (
    <div className="flex flex-col">
      <h1 className="text-center mb-12 mt-4 uppercase font-bold text-2xl">
        Create Product
      </h1>
      <form onSubmit={handleSubmit} className="flex  justify-center gap-4">
        <div className="flex flex-col gap-4 text-black">
          <div className="flex items-center gap-4 text-black">
            <input
              className="px-2 py-3"
              type="text"
              placeholder="Brand..."
              id="brand"
              onChange={handleChange}
            />
            <input
              className="px-2 py-3"
              type="text"
              placeholder="Name..."
              id="name"
              onChange={handleChange}
            />
          </div>
          <textarea
            className="px-2 py-3"
            placeholder="Description..."
            id="description"
            onChange={handleChange}
          />
          <div className="flex items-center gap-4 text-black">
            <input
              className="px-2 py-3"
              type="number"
              placeholder="Price..."
              id="price"
              onChange={handleChange}
            />
            <input
              className="px-2 py-3"
              type="number"
              placeholder="Count..."
              id="count"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4 justify-between text-black">
            <select
              name="size"
              id="size"
              className="text-black px-1 py-2 w-full"
              onChange={handleChange}
            >
              <option value={""} selected hidden>
                Size
              </option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <select
              name="category"
              id="category"
              className="text-black px-1 py-2 w-full"
              onChange={handleChange}
            >
              <option value={""} selected hidden>
                Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            <span>Images:</span>{" "}
            <span className="font-light">
              The first image will be the cover (max 3 images!)
            </span>
          </p>
          <div>
            {" "}
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              type="button"
              className="px-4 py-3 border border-white  hover:bg-white/10  transition duration-300"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <button
            disabled={loading}
            className="px-4 py-3 border border-white  hover:bg-white/10  transition duration-300"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <p className="text-red-500">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={index} className="flex justify-between items-center">
                <img
                  src={url}
                  alt="productUrl"
                  className="w-32 h-32 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-400 uppercase hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};
