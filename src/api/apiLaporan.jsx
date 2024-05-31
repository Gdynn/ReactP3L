import useAxios from "../api"; // Sesuaikan dengan path sesuai struktur proyek Anda

export const GetPenjualanBulanan = async (bulan, tahun) => {
  try {
    const response = await useAxios.get(`/laporan-penjualan-bulanan/${bulan}/${tahun}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("response : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};