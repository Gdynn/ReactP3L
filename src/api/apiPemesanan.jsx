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

export const UploadBuktiBayar = async (id, data) => {
    try {
        const response = await useAxios.put(`/buktibayar/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
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