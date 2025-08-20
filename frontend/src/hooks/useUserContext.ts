import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within a UserProvider");
  return ctx;
};