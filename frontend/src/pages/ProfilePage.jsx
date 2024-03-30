import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useSelector } from "react-redux";

export const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto flex flex-col gap-4 mt-14">
        <input type="file" accept="image/*" className="hidden" ref={fileRef} />
        <img
          src={currentUser.profilePicture}
          alt="userProfile"
          className="w-24 self-center rounded-full cursor-pointer hover:opacity-90"
          onClick={() => fileRef.current.click()}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className="text-black p-2"
            name="username"
            id="username"
            placeholder="Username..."
            type="text"
            value={currentUser.username}
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
            value={currentUser.email}
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
          />
        </div>
        <button className="w-full px-4 py-2 border border-white hover:border-black hover:bg-white hover:text-black transition duration-300 my-2">
          Update Profile
        </button>
        <div className="text-red-500 flex justify-between items-center">
          <button className="hover:underline">Log Out</button>
          <button className="hover:underline">Delete Profile</button>
        </div>
      </div>
    </div>
  );
};
