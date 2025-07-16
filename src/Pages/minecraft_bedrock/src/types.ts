// src/types.ts

export interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Banner {
  id: string;
  type: 'static' | 'carousel';
  title: string;
  description: string;
  images: CarouselImage[];
}

export interface BackendBanner {
    id?: number;
    type: string;
    title: string;
    description?: string;
    images: string[];
}

export interface Report {
  id: string;
  title: string;
  data: string;
  createdAt: string;
}