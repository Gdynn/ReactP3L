import useAxios from "../api"; // Adjust the path according to your project structure

// Fetch all pickup pesanan
export const GetAllLaporanBahan = async () => {
  try {
    const response = await useAxios.get("/pengeluaran", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data; // Pastikan respons datanya diambil di sini
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch pickup pesanan by ID
export const GetLaporanBahanById = async (id) => {
  try {
    const response = await useAxios.get(`/pengeluaran/${id}`, {
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

// Add new pickup pesanan
export const AddLaporanBahan = async (data) => {
  try {
    const response = await useAxios.post("/pengeluaran", data, {
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

// Update pickup pesanan by ID
export const UpdateLaporanBahan = async (id, data) => {
  try {
    const response = await useAxios.put(`/pengeluaran/${id}`, data, {
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

// Delete pickup pesanan by ID
export const DeleteLaporanBahan = async (id) => {
  try {
    const response = await useAxios.delete(`/pengeluaran/${id}`, {
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
