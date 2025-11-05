
export interface LandListing {
  id: number;
  imageUrl: string; // Deprecated, use images[0] instead
  title: string;
  location: string;
  fullAddress: string;
  price: string;
  tags: string[];
  features: string[];
  description: string;
  area: string;
  solarPosition: string;
  propertyType: string;
  images: string[];
  code: string;
}
