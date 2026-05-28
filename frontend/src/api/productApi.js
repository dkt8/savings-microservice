import api from "./axios";

export const getProducts = async () => {
  const res = await api.get("/api/v1/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/api/v1/products/${id}`);
  return res.data;
};

export const createProduct = async (payload) => {
  const res = await api.post("/api/v1/products", payload);
  return res.data;
};

export const updateProductRate = async ({ id, interestRate }) => {
  const res = await api.put(`/api/v1/products/${id}/rate`, { interestRate });
  return res.data;
};

export const deactivateProduct = async (id) => {
  const res = await api.put(`/api/v1/products/${id}/deactivate`);
  return res.data;
};
