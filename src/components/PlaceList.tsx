import { useEffect, useState } from "react";
import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import { Place } from "@/types/Place";

export default function PlaceList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <input
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places
          ?.filter(
            (place) =>
              place.name.toLowerCase().includes(search.toLowerCase()) ||
              place.city.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((place) => (
            <Link key={place.id} href={`/places/${place.id}`}>
              <PlaceCard place={place} />
            </Link>
          ))}
      </div>
    </>
  );
}
