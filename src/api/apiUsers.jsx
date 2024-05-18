import useAxios from ".";
// Mendapatkan semua content untuk ditaruh di halaman dashboard

//untuk menampilkan semua user
export const GetAllUser = async () => {
  try {
    const response = await useAxios.get("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(`ini responnya : ${response}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetUserByLogin = async () => {
  const token = sessionStorage.getItem("token");
  console.log("token pler:",token);
  try {
    console.log(`ini tokennya : ${sessionStorage.getItem("token")}`);
    const response = await useAxios.get(`/userLogin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(`resonse : ${response.status}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetUserById = async (id) => {
  try {
    const response = await useAxios.get(`/usersalamat/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(`resonse : ${response.status}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateProfile = async (data) => {
  console.log(data);
  try {
    const response = await useAxios.post(`/users/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // untuk upload thumbnail
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeleteUser = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UpdateUser = async (data) => {
  console.log(data);
  try {
    const response = await useAxios.post(`/usersUpdate/${data.id_user}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // untuk upload thumbnail
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
