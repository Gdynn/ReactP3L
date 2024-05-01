// transaksiLaundryController.js

import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua transaksi laundry
export const GetAllTransaksiLaundry = async () => {
  try {
    const response = await useAxios.get("/transaksiLaundry", {
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

// Menampilkan transaksi laundry berdasarkan ID
export const GetTransaksiLaundryById = async (id) => {
  try {
    const response = await useAxios.get(`/transaksiLaundry/${id}`, {
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

// Menampilkan transaksi laundry berdasarkan ID user
export const GetTransaksiLaundryByIdUser = async () => {
  try {
    const response = await useAxios.get(`/transaksiLaundryByUser`, {
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

// Membuat transaksi laundry baru
export const OrderTransaksiLaundry = async (data) => {
  try {
    const response = await useAxios.post("/transaksiLaundry", data, {
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

// Update total harga transaksi laundry
export const UpdateTotalHargaTransaksiLaundry = async (id) => {
  try {
    const response = await useAxios.put(`/transaksiLaundry/harga/${id}`, null, {
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

// Pembayaran transaksi laundry
export const BayarTransaksiLaundry = async (id) => {
  try {
    const response = await useAxios.put(`/transaksiLaundry/bayar/${id}`, null, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Mengupdate transaksi laundry
export const UpdateTransaksiLaundry = async (id, data) => {
  try {
    const response = await useAxios.put(`/transaksi-laundry/${id}`, data, {
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

// Menghapus transaksi laundry
export const DeleteTransaksiLaundry = async (id) => {
  try {
    const response = await useAxios.delete(`/TransaksiLaundry/${id}`, {
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
