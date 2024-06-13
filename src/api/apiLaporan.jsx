import useAxios from "../api"; // Adjust the path according to your project structure

// Fetch all pickup pesanan
export const GetAllLaporan = async () => {
  try {
    const response = await useAxios.get("/monthlysales", {
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
export const GetLaporanById = async (id) => {
  try {
    const response = await useAxios.get(`/monthlysales/${id}`, {
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
export const AddLaporan = async (data) => {
  try {
    const response = await useAxios.post("/monthlysales", data, {
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
export const UpdateLaporan = async (id, data) => {
  try {
    const response = await useAxios.put(`/monthlysales/${id}`, data, {
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
export const DeleteLaporan = async (id) => {
  try {
    const response = await useAxios.delete(`/monthlysales/${id}`, {
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
