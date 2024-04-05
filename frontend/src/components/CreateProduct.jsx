import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

export const CreateProduct = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

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
        <button className="px-4 py-3 border border-white  hover:bg-white/10  transition duration-300">
          Create Product
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
    </div>
  );
};
