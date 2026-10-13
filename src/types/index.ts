export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'Portraits' | 'Editorial' | 'Atmosphere' | 'Monolith';
  year: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  dimensions: string;
  exif: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  description: string;
}

export type CategoryFilter = 'All' | 'Portraits' | 'Editorial' | 'Atmosphere' | 'Monolith';

export interface InquiryFormData {
  name: string;
  email: string;
  inquiryType: string;
  date?: string;
  message: string;
}
