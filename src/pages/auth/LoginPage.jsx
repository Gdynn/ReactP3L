import { Container } from "react-bootstrap";
import FormLogin from "../../components/forms/FormLogin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPageBackground from "../admin/adminPageBackground";

const LoginPage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    console.log(`token ${tokenDariSS}`);
    setToken(tokenDariSS);
    if (tokenDariSS) {
      navigate("/user");
    }
  }, [navigate]);
  return (
    !token && (
      <AdminPageBackground>
        <FormLogin />
      </AdminPageBackground>
    )
  );
};
export default LoginPage;
