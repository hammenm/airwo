import { createContext, useContext } from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => {},
});

export const useToken = () => {
  const { token, setToken } = useContext(TokenContext);
  return { token, setToken };
};
