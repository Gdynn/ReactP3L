import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

// Menampilkan semua produk
export const GetAllPemesanan = async () => {
  try {
    const response = await useAxios.get("/pemesanan", {
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

export const GetPemesananDiterima = async () => {
  try {
    const response = await useAxios.get("/pemesananditerima", {
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

export const GetPemesananBahanBaku = async (id) => {
  try {
    const response = await useAxios.get(`/pemesananbahanbaku/${id}`, {
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

export const ProsesPemesanan = async (id) => {
  try {
    const response = await useAxios.put(`/pemesanandiproses/${id}`, {
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
export const GetPemesananById = async (id) => {
  try {
    const response = await useAxios.get(`/pemesananId/${id}`, {
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
export const AddPemesanan = async (data) => {
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

// Mengupdate item berdasarkan ID
export const UpdatePemesanan = async (id, data) => {
  try {
    const response = await useAxios.put(`/pemesanan/${id}`, data, {
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
export const DeletePemesanan = async (id) => {
  try {
    const response = await useAxios.delete(`/pemesanan/${id}`, {
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
export const AddOrderan = async (data) => {
    try {
        const response = await useAxios.post("/pemesanan", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response; // Return the entire response object
    } catch (error) {
        if (error.response) {
            // Return the entire error response object
            return error.response;
        } else {
            // Return a custom error object if the response is unavailable
            return {
                status: 500,
                data: { message: 'Server error' },
            };
        }
    }
};

export const GetOrderanById = async (id) => {
    try {
        const response = await useAxios.get(`/pemesanan/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: "An unexpected error occurred" };
        }
    }
};

// export const UploadBuktiBayar = async (id, data) => {
//     try {
//         const response = await useAxios.put(`/buktibayar/${id}`, data, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//         });
//         return response.data.data;
//     } catch (error) {
//         if (error.response) {
//             throw error.response.data;
//         } else {
//             throw { message: "An unexpected error occurred" };
//         }
//     }
// };

export const UploadBuktiBayar = async (data) => {
  try {
      const response = await useAxios.put(`/buktibayar/${data.id}`, data, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
      });
      return response.data.data;
  } catch (error) {
      if (error.response) {
          throw error.response.data;
      } else {
          throw { message: "An unexpected error occurred" };
      }
  }
};