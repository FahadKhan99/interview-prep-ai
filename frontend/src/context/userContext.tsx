import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import type { User } from "../utils/types";


// define the shape of context
type UserContextType = {
  user: User | null;
  loading: boolean;
  updateUser: (newUser: User | null) => void;
  clearUser: () => void; // clears local state
  logout: () => void; // remove server jwt cookie
};

// create context with explicit type
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch user profile from backend
  const fetchUser = async () => {
    try {
      const res = await api.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(res.data);
    } catch (error) {
      console.error("User not authenticated");
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const clearUser = () => setUser(null);
  const updateUser = (newUser: User | null) => setUser(newUser);

  const logout = async () => {
    try {
      await api.post(API_PATHS.AUTH.LOGOUT); // server clears cookie
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setUser(null);
    }
  };
  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, clearUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
