import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const fileRef = useRef();
  const dispatch = useDispatch();

  function handleFormDataChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        toast.success("User Profile Updated");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-4 mt-14"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={handleImageChange}
        />
        <img
          src={imageFileUrl || currentUser.profilePicture}
          alt="userProfile"
          className="w-24 self-center rounded-full cursor-pointer hover:opacity-90"
          onClick={() => fileRef.current.click()}
        />
        {imageFileUploadError && (
          <p className="text-red-500">{imageFileUploadError}</p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className="text-black p-2"
            name="username"
            id="username"
            placeholder="Username..."
            type="text"
            defaultValue={currentUser.username}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Email</label>
          <input
            className="text-black p-2"
            name="email"
            id="email"
            placeholder="Email..."
            type="email"
            defaultValue={currentUser.email}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Password</label>
          <input
            className="text-black p-2"
            name="password"
            id="password"
            placeholder="Password..."
            type="password"
            onChange={handleFormDataChange}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300 my-2"
        >
          Update Profile
        </button>
        <div className="text-red-500 flex justify-between items-center">
          <button type="button" className="hover:underline">
            Log Out
          </button>
          <button type="button" className="hover:underline">
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};
