import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useToken";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const { setToken } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const { email, password } = e.currentTarget.elements as unknown as {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    setLoading(true);
    setError(undefined);
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid credentials.");
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <div className="flex-1 flex-grow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Email
            <input
              className="border border-gray-300 rounded-md p-2 disabled:cursor-not-allowed"
              disabled={loading}
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              className="border border-gray-300 rounded-md p-2 disabled:cursor-not-allowed"
              disabled={loading}
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button
            className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        {error && <div>Error: {error.message}</div>}
        <Link
          href="/auth/register"
          className="text-sm font-medium text-gray-500"
        >
          Don&apos;t have an account yet?
        </Link>
      </div>
    </main>
  );
}
