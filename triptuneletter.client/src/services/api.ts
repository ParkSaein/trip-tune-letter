import axios from "axios";

const API_BASE_URL = 'http://localhost:8081/api';

// Axios factory that sets Authorization when token is provided
const createApiClient = (token?: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

import type { 
  NewsResponse, 
  NewsCommentResponse, 
  NewsCommentRequest, 
  ProductCommentRequest,
  TravelDestinationCommentRequest,
  ProductResponse,
  TravelDestinationResponse,
  ProductCommentResponse,
  TravelDestinationCommentResponse
} from "./data";

// News endpoints
export const getAllNews = async (): Promise<NewsResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<NewsResponse[]>("/news");
  return resp.data;
};

export const getNews = async (id: string): Promise<NewsResponse> => {
  const client = createApiClient();
  const resp = await client.get<NewsResponse>(`/news/${id}`);
  return resp.data;
};

export const getImageUrl = (path: string, type: 'news' | 'products' | 'destinations' = 'news') => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) {
    const backendOrigin = API_BASE_URL.replace(/\/api$/, "");
    return `${backendOrigin}${path}`;
  }
  return `${API_BASE_URL}/${type}/images/${path}`;
};

export const createNews = async (formData: FormData, token: string): Promise<string> => {
  const client = createApiClient(token);
  const resp = await client.post<string>("/news", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resp.data;
};

export const updateNews = async (id: string, formData: FormData, token: string) => {
  const client = createApiClient(token);
  await client.put(`/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteNews = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/news/${id}`);
};

export const searchNews = async (keyword: string): Promise<NewsResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<NewsResponse[]>(`/news/search`, { params: { keyword } });
  return resp.data;
};

export const summarizeNews = async (newsId: string, token?: string): Promise<string> => {
  const client = createApiClient(token);
  const resp = await client.post<string>(`/news/summarization`, { newsId });
  return resp.data;
};

export const getMyNews = async (token: string): Promise<NewsResponse[]> => {
  const client = createApiClient(token);
  const resp = await client.get<NewsResponse[]>(`/news/me`);
  return resp.data;
};

// Product endpoints
export const getAllProducts = async (): Promise<ProductResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<ProductResponse[]>("/products");
  return resp.data;
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
  const client = createApiClient();
  const resp = await client.get<ProductResponse>(`/products/${id}`);
  return resp.data;
};

export const getMyProducts = async (token: string): Promise<ProductResponse[]> => {
  const client = createApiClient(token);
  const resp = await client.get<ProductResponse[]>(`/products/me`);
  return resp.data;
};

export const searchProducts = async (keyword: string): Promise<ProductResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<ProductResponse[]>(`/products/search`, { params: { keyword } });
  return resp.data;
};

export const recommendProducts = async (sentence: string): Promise<ProductResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<ProductResponse[]>(`/products/recommend`, { params: { sentence } });
  return resp.data;
};

export const createProduct = async (formData: FormData, token: string): Promise<string> => {
  const client = createApiClient(token);
  const resp = await client.post<string>("/products", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resp.data;
};

export const updateProduct = async (id: string, formData: FormData, token: string) => {
  const client = createApiClient(token);
  await client.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/products/${id}`);
};

// Destination endpoints
export const getAllDestinations = async (): Promise<TravelDestinationResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<TravelDestinationResponse[]>("/destinations");
  return resp.data;
};

export const getDestination = async (id: string): Promise<TravelDestinationResponse> => {
  const client = createApiClient();
  const resp = await client.get<TravelDestinationResponse>(`/destinations/${id}`);
  return resp.data;
};

export const getMyDestinations = async (token: string): Promise<TravelDestinationResponse[]> => {
  const client = createApiClient(token);
  const resp = await client.get<TravelDestinationResponse[]>(`/destinations/me`);
  return resp.data;
};

export const searchDestinations = async (keyword: string): Promise<TravelDestinationResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<TravelDestinationResponse[]>(`/destinations/search`, { params: { keyword } });
  return resp.data;
};

export const recommendDestinations = async (sentence: string): Promise<TravelDestinationResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<TravelDestinationResponse[]>(`/destinations/recommend`, { params: { sentence } });
  return resp.data;
};

export const createDestination = async (formData: FormData, token: string): Promise<string> => {
  const client = createApiClient(token);
  const resp = await client.post<string>("/destinations", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resp.data;
};

export const updateDestination = async (id: string, formData: FormData, token: string) => {
  const client = createApiClient(token);
  await client.put(`/destinations/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteDestination = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/destinations/${id}`);
};

// Comment endpoints
export const getCommentsByNews = async (newsId: string): Promise<NewsCommentResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<NewsCommentResponse[]>(`/comments/news/${newsId}`);
  return resp.data;
};

export const getCommentsByProduct = async (productId: string): Promise<ProductCommentResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<ProductCommentResponse[]>(`/comments/product/${productId}`);
  return resp.data;
};

export const getCommentsByDestination = async (destinationId: string): Promise<TravelDestinationCommentResponse[]> => {
  const client = createApiClient();
  const resp = await client.get<TravelDestinationCommentResponse[]>(`/comments/destination/${destinationId}`);
  return resp.data;
};

export const getMyNewsComments = async (token: string): Promise<NewsCommentResponse[]> => {
  const client = createApiClient(token);
  const resp = await client.get<NewsCommentResponse[]>(`/comments/me/news`);
  return resp.data;
};

export const getMyProductComments = async (token: string): Promise<ProductCommentResponse[]> => {
  const client = createApiClient(token);
  const resp = await client.get<ProductCommentResponse[]>(`/comments/me/products`);
  return resp.data;
};

export const addNewsComment = async (dto: NewsCommentRequest, token: string) => {
  const client = createApiClient(token);
  await client.post(`/comments/news`, dto);
};

export const addProductComment = async (dto: ProductCommentRequest, token: string) => {
  const client = createApiClient(token);
  await client.post(`/comments/product`, dto);
};

export const addTravelDestinationComment = async (dto: TravelDestinationCommentRequest, token: string) => {
  const client = createApiClient(token);
  await client.post(`/comments/destination`, dto);
};

export const deleteNewsComment = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/comments/news/${id}`);
};

export const deleteProductComment = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/comments/product/${id}`);
};

export const deleteTravelDestinationComment = async (id: string, token: string) => {
  const client = createApiClient(token);
  await client.delete(`/comments/destination/${id}`);
};

// Chat endpoint
export const chatWithGemini = async (message: string, token: string): Promise<string> => {
  const client = createApiClient(token);
  const resp = await client.post<string>(`/chat`, message, {
    headers: { 'Content-Type': 'application/json' }
  });
  return resp.data;
};
