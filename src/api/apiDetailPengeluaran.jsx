import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua produk
export const GetAllDetailPengeluaran = async () => {
  try {
    const response = await useAxios.get("/detailpengeluaran", {
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
export const GetDetailPengeluaranById = async (id) => {
  try {
    const response = await useAxios.get(`/detailpengeluaran/${id}`, {
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
export const AddDetailPengeluaran = async (data) => {
  try {
    const response = await useAxios.post("/detailpengeluaran", data, {
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
export const UpdateDetailPengeluaran = async (id, data) => {
  try {
    const response = await useAxios.put(`/detailpengeluaran/${id}`, data, {
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
export const DeleteDetailPengeluaran = async (id) => {
  try {
    const response = await useAxios.delete(`/detailpengeluaran/${id}`, {
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