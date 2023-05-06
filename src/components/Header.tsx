import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useToken";

const pathSun =
  "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z";
const pathMoon =
  "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";

export default function Header() {
  const { user, setUser } = useUser();
  const { setToken } = useToken();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme.type === "light";

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <header className="flex items-center justify-between w-full max-w-4xl px-4 py-8 mx-auto">
      <Link
        href="/"
        className="text-3xl font-bold text-slate-900 dark:text-slate-200"
      >
        Airwo
      </Link>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-1 text-slate-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          onClick={toggleTheme}
        >
          <span className="sr-only">
            Toggle {isLight ? "dark" : "light"} mode
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              className={`${
                theme.type === "light" ? "text-slate-900" : "text-slate-200"
              }`}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isLight ? pathMoon : pathSun}
            />
          </svg>
        </button>
        {user ? (
          <Link href="/me">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        ) : null}
        {user ? (
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link href="/auth/login">
            <span className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
              Login
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
