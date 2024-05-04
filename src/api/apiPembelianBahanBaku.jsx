import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua produk
export const GetAllPembelianBahanBaku = async () => {
  try {
    const response = await useAxios.get("/pembelianbahanbaku", {
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
export const GetPembelianBahanBakuById = async (id) => {
  try {
    const response = await useAxios.get(`/pembelianbahanbaku/${id}`, {
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
export const AddPembelianBahanBaku = async (data) => {
  try {
    const response = await useAxios.post("/pembelianbahanbaku", data, {
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
export const UpdatePembelianBahanBaku = async (id, data) => {
  try {
    const response = await useAxios.put(`/pembelianbahanbaku/${id}`, data, {
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
export const DeletePembelianBahanBaku = async (id) => {
  try {
    const response = await useAxios.delete(`/pembelianbahanbaku/${id}`, {
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