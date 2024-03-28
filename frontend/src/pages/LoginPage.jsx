import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
} from "../redux/user/userSlice";

export const LoginPage = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        registerFailure(data.error);
        console.log(data.error);
        return;
      }

      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error.message);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-10 pt-24 ">
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
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="px-2 py-1 text-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="px-2 py-1 text-black"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300"
              >
                Üye Girişi
              </button>
              <p className=" cursor-pointer hover:underline font-light">
                Parolami Unuttum
              </p>
            </div>
          </form>
        </div>
        <div className="">
          <img
            src="https://cdn.myikas.com/images/theme-images/5423b470-64ea-44bd-81a2-fb581e2b6fa8/image_1080.webp"
            alt=""
            className="h-[950px]"
          />
        </div>
      </div>
    </div>
  );
};
