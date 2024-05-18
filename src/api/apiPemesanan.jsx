import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menambahkan item baru
export const AddOrderan = async (data) => {
  try {
    const response = await useAxios.post("/pemesanan", data, {
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