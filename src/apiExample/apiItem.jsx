// apiController.js

import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua item
export const GetAllItems = async () => {
  try {
    const response = await useAxios.get("/item", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("response : ");
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menampilkan item berdasarkan ID
export const GetItemById = async (id) => {
  try {
    const response = await useAxios.get(`/item/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menambahkan item baru
export const AddItem = async (data) => {
  try {
    const response = await useAxios.post("/item", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Mengupdate item berdasarkan ID
export const UpdateItem = async (id, data) => {
  try {
    const response = await useAxios.put(`/item/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menghapus item berdasarkan ID
export const DeleteItem = async (id) => {
  try {
    const response = await useAxios.delete(`/item/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
