// transaksiTambahanController.js

import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan transaksi tambahan berdasarkan ID transaksi laundry
export const GetTransaksiTambahanByIdTransaksi = async (idTransaksiLaundry) => {
  try {
    const response = await useAxios.get(`/transaksiTambahan/transaksi/${idTransaksiLaundry}`, {
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

// Menampilkan transaksi tambahan berdasarkan ID
export const GetTransaksiTambahanById = async (id) => {
  try {
    const response = await useAxios.get(`/transaksiTambahan/${id}`, {
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

// Menambah item pada transaksi tambahan
export const TambahItemTransaksiTambahan = async (data) => {
  try {
    const response = await useAxios.post("/transaksiTambahan", data, {
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

// Mengupdate transaksi tambahan
export const UpdateTransaksiTambahan = async (id, data) => {
  try {
    const response = await useAxios.put(`/transaksiTambahan/${id}`, data, {
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

// Menghapus transaksi tambahan
export const DeleteTransaksiTambahan = async (id) => {
  try {
    const response = await useAxios.delete(`/transaksiTambahan/${id}`, {
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
