export interface NewsResponse {
  id?: string;
  title: string;
  content: string;
  userName: string;
  imageUrls: string[];
  createdAt: string; // ISO date string
  updatedAt: string;
}

export interface NewsCommentResponse {
  id?: string;
  newsId: string;
  content: string;
  userName: string;
  createdAt: string;
}

export interface CommentResponse {
  id?: string;
  newsId?: string;
  content: string;
  userName: string;
  createdAt: string;
}

export interface ProductCommentResponse {
  id?: string;
  productId: string;
  content: string;
  userName: string;
  createdAt: string;
}

export interface TravelDestinationCommentResponse {
  id?: string;
  travelDestinationId: string;
  content: string;
  userName: string;
  createdAt: string;
}

export interface NewsCommentRequest {
  newsId: string;
  content: string;
}

export interface ProductCommentRequest {
  productId: string;
  content: string;
}

export interface TravelDestinationCommentRequest {
  travelDestinationId: string;
  content: string;
}

export interface NewsRequest {
  title: string;
  content: string;
}

export interface ProductResponse {
  id?: string;
  name: string;
  price: number;
  description?: string;
  userName: string;
  largeCategory?: string;
  middleCategory?: string;
  smallCategory?: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TravelDestinationResponse {
  id?: string;
  name: string;
  description?: string;
  location: string;
  userName: string;
  country?: string;
  city?: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  price: number;
  description?: string;
  smallCategory?: string;
}

export interface TravelDestinationRequest {
  name: string;
  description?: string;
  location: string;
  city?: string;
}
