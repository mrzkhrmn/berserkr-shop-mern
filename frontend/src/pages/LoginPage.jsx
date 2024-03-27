import { NavLink } from "react-router-dom";

export const LoginPage = () => {
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
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="px-2 py-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="px-2 py-1"
              />
            </div>
            <div className="flex flex-col gap-4">
              <button className="w-full px-4 py-2 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300">
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
