import axiosInstance from "./axios";

// 상세조회
export const getNewsletterDetail = (id) => {
  return axiosInstance.get(`/newsletters/${id}`);
};

// 수정
export const updateNewsletter = (id, data) => {
  return axiosInstance.put(`/newsletters/${id}`, data);
};

// 삭제
export const deleteNewsletter = (id) => {
  return axiosInstance.delete(`/newsletters/${id}`);
};

// 공개
export const publishNewsletter = (id) => {
  return axiosInstance.patch(`/newsletters/${id}/publish`);
};