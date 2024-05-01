import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua produk
export const GetAllProduk = async () => {
  try {
    const response = await useAxios.get("/produk", {
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
export const GetProdukById = async (id) => {
  try {
    const response = await useAxios.get(`/produk/${id}`, {
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
export const AddProduk = async (data) => {
  try {
    const response = await useAxios.post("/produk", data, {
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
export const UpdateProduk = async (id, data) => {
  try {
    const response = await useAxios.put(`/produk/${id}`, data, {
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
export const DeleteProduk = async (id) => {
  try {
    const response = await useAxios.delete(`/produk/${id}`, {
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