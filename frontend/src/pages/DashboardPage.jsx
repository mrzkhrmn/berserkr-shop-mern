import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateProductPage } from "./CreateProductPage";

export const DashboardPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isAdmin ? (
    <div>
      <CreateProductPage />
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
