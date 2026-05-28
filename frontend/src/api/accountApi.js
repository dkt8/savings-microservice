import api from "./axios";

export const openAccount = async (payload) => {
  const res = await api.post("/api/v1/accounts", payload);
  return res.data;
};

export const getAccountById = async (id) => {
  const res = await api.get(`/api/v1/accounts/${id}`);
  return res.data;
};

export const getAccountsByCustomerId = async (customerId) => {
  const res = await api.get(`/api/v1/accounts/customer/${customerId}`);
  return res.data;
};

export const freezeAccount = async (id) => {
  const res = await api.put(`/api/v1/accounts/${id}/freeze`);
  return res.data;
};

export const unfreezeAccount = async (id) => {
  const res = await api.put(`/api/v1/accounts/${id}/unfreeze`);
  return res.data;
};

export const closeAccount = async (id) => {
  const res = await api.put(`/api/v1/accounts/${id}/close`);
  return res.data;
};
