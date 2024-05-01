// apiController.js

import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua deposit
export const GetAllDeposits = async () => {
  try {
    const response = await useAxios.get("/deposit", {
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

// Menampilkan deposit berdasarkan ID
export const GetDepositById = async (id) => {
  try {
    const response = await useAxios.get(`/deposit/${id}`, {
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

// Menampilkan deposit berdasarkan ID user
export const GetDepositByUserId = async (id) => {
  try {
    const response = await useAxios.get(`/depositUser/${id}`, {
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

// Melakukan deposit
export const Deposit = async (data) => {
  try {
    const response = await useAxios.post("/deposit", data, {
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

// Melakukan pembayaran
export const Pembayaran = async (data) => {
  try {
    const response = await useAxios.post("/pembayaran", data, {
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
