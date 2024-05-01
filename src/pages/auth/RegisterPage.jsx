import { Container, Card } from "react-bootstrap";
import FormRegister from "../../components/forms/FormRegister";
import imgAH from "../../assets/images/atmahub-white.png";
import "./Form.css";
import AdminPageBackground from "../admin/adminPageBackground";

const RegisterPage = () => {
  return (
    <AdminPageBackground>
        <FormRegister />
    </AdminPageBackground>
  );
};
export default RegisterPage;
