import useAxios from ".";

// Assuming you're using Axios, make sure to import it at the beginning of your file
// import useAxios from 'axios';

export const Login = async (data) => {
  try {
    const response = await useAxios.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // biar tau data masuk apa engga
    console.log("Response:", response.data.data);

    console.log("Token:", response.data.access_token);
    //menaruk token di stronge agar bisa digunakan di query lain yang butuh auth
    
    
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error:", error);
    // Throw the error response data if needed
    throw error.response.data;
  }
};

//register
export const Register = async (data) => { //data diisi dengan maping atau object dasar
  try {
    
    const response = await useAxios.post("/register", data);

    console.log("Response:", response.data.data);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


