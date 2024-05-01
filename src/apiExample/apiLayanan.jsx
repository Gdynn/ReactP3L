// apiController.js

import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua layanan
export const GetAllLayanan = async () => {
  try {
    const response = await useAxios.get("/layanan", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menampilkan layanan berdasarkan ID
export const GetLayananById = async (id) => {
  try {
    const response = await useAxios.get(`/layanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menambahkan layanan baru
export const AddLayanan = async (data) => {
  try {
    const response = await useAxios.post("/layanan", data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Mengupdate layanan berdasarkan ID
export const UpdateLayanan = async (data) => {
  try {
    const response = await useAxios.put(`/layanan/${data.id_layanan}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Menghapus layanan berdasarkan ID
export const DeleteLayanan = async (id) => {
  try {
    const response = await useAxios.delete(`/layanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
