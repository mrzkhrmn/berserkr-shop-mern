import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerFailure } from "../redux/user/userSlice";

export const RegisterPage = () => {
  const { error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        dispatch(registerFailure(data.message));
        return;
      }
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      console.log(error.message);
    }
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6 pt-24 ">
          <div className="flex items-center min-w-[450px]  gap-16 text-white text-2xl">
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Üye Girişi
            </NavLink>
            <NavLink
              to={"/register"}
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Üye Ol
            </NavLink>
          </div>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                id="username"
                type="text"
                placeholder="Kullanıcı Adı..."
                className="px-2 py-1 "
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email..."
                className="px-2 py-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password..."
                className="px-2 py-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full px-4 py-3 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300"
              >
                Hesap Oluştur
              </button>
              <p className="w-full text-center flex items-center before:bg-white before:flex-1 after:bg-white  after:h-[2px] before:h-[2px] after:flex-1">
                <span>ya da</span>
              </p>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300"
              >
                <FcGoogle /> Google ile devam et
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
        <div className="">
          <img
            src="https://cdn.myikas.com/images/theme-images/5423b470-64ea-44bd-81a2-fb581e2b6fa8/image_1080.webp"
            alt=""
            className="max-w-[950px] h-[950px]"
          />
        </div>
      </div>
    </div>
  );
};
