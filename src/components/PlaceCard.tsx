import { Place } from "@/types/Place";

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative pb-48 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={place.image}
          alt={place.name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {place.name}
        </h3>
        <p className="text-sm font-medium text-gray-500">{place.city.name}</p>
        <p className="text-sm font-medium text-gray-500">
          {place.priceByNight}€/night
        </p>
      </div>
    </div>
  );
}
