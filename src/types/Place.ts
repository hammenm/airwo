export type Place = {
  id: string;
  name: string;
  description: string;
  image: string;
  city: {
    name: string;
  };
  priceByNight: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  maxGuests: number;
  host: {
    name: string;
    avatar: string;
  }
};
