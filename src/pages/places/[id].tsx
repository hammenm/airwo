import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Place } from "@/types/Place";

export default function PlaceDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [place, setPlace] = useState<Place>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!id) return;

    fetch(`/api/places/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {place && (
        <>
          <img
            className="h-96 w-full object-cover mb-4"
            src={place.image}
            alt={place.name}
          />
          <div className="flex flex-col md:flex-row">
            {/* Main content */}
            <div className="flex-1 flex-grow">
              <h2 className="text-2xl font-bold">{place.name}</h2>
              <p className="text-sm font-medium text-gray-500">
                {place.city.name}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {place.priceByNight}€/night
              </p>
              <p className="text-sm font-medium text-gray-500">
                {place.description}
              </p>
            </div>
            {/* Card with host name and host avatar */}
            <div className="w-80">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={place.host.avatar}
                    alt={place.host.name}
                  />
                  <h3 className="text-lg font-medium text-gray-900 ml-2 truncate">
                    {place.host.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
