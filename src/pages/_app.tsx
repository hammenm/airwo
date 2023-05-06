import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ThemeType, ThemeContext } from "@/hooks/useTheme";
import { TokenContext } from "@/hooks/useToken";
import { UserContext } from "@/hooks/useUser";
import Header from "@/components/Header";
import { User } from "@/types";
import { decode } from "jsonwebtoken";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [themeType, setThemeType] = useState<ThemeType>("dark");
  const toggleTheme = () => {
    if (themeType === "light") {
      setThemeType("dark");
    } else {
      setThemeType("light");
    }
  };
  const theme = {
    type: themeType,
  };

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      const user = decode(token);
      if (user !== null && typeof user !== "string") {
        setUser(user as User);
      }
    }
  }, []);

  const handleSetToken = (token: string | null) => {
    setToken(token);
    if (token === null) {
      sessionStorage.removeItem("token");
      return;
    }
    sessionStorage.setItem("token", token);
  };

  return (
    <>
      <Head>
        <title>Airwo</title>
      </Head>
      <TokenContext.Provider value={{ token, setToken: handleSetToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`${inter.className} ${theme.type}`}>
              <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
                <Header />
                <Component {...pageProps} />
              </div>
            </div>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </TokenContext.Provider>
    </>
  );
}
