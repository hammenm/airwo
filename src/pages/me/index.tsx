import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useToken";

export default function Me() {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const { name, email } = e.currentTarget.elements as unknown as {
      name: HTMLInputElement;
      email: HTMLInputElement;
    };

    setLoading(true);
    setError(undefined);
    setSuccess(false);
    fetch("/api/auth/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name.value, email: email.value }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to update profile.");
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          Name
          <input
            className="border border-gray-300 rounded-md p-2 disabled:cursor-not-allowed"
            disabled={loading}
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          Email
          <input
            className="border border-gray-300 rounded-md p-2 disabled:cursor-not-allowed"
            disabled={loading}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        {error && (
          <p className="text-red-500">
            <span className="font-bold">Error:</span> {error.message}
          </p>
        )}
        {success && (
          <p className="text-green-500">
            <span className="font-bold">Success!</span> Your profile has been
            updated.
          </p>
        )}
      </form>
    </main>
  );
}
