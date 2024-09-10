export interface Place {
  id: string;
  name: string;
  visited: boolean;
  rating: number | null;
  address: string;
  latLng: {
    latitude: number;
    longitude: number;
  };
  categories: string[];
}
