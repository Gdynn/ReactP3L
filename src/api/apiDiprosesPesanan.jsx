import useAxios from "../api"; // Adjust the path according to your project structure

// Fetch all pickup pesanan
export const GetAllProsesPesanan = async () => {
  try {
    const response = await useAxios.get("/pickuppesanan", {
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

// Fetch pickup pesanan by ID
export const GetProsesPesananById = async (id) => {
  try {
    const response = await useAxios.get(`/pickuppesanan/${id}`, {
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
export const AddProsesPesanan = async (data) => {
  try {
    const response = await useAxios.post("/pickuppesanan", data, {
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
export const UpdateDiprosesPesanan = async (id, data) => {
  try {
    const response = await useAxios.put(`/pickuppesanan/${id}`, data, {
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
export const DeleteProsesPesanan = async (id) => {
  try {
    const response = await useAxios.delete(`/pickuppesanan/${id}`, {
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
