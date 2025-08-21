import React from "react";
import { useUserContext } from "../../hooks/useUserContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();

  return (
    <div>
      <Navbar />

      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
