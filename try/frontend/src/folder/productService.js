import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

// GET ALL
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.products;
};

// GET SINGLE
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.product;
};

// POST
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data.product;
};

// PUT
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data.product;
};

// DELETE
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};