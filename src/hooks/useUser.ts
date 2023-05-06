import { createContext, useContext } from "react";
import { User } from "@/types";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};
