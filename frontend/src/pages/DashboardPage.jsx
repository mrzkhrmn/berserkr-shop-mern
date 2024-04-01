import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const DashboardPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isAdmin ? (
    <div>
      <h1>Dashboardpage</h1>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
