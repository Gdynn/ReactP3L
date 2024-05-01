import "./modal.css";
import {

  Spinner,

  Button,
} from "react-bootstrap";

import { useNavigate, useLocation } from "react-router-dom";
import imgProfile from "../../assets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { GetUserByLogin } from "../../api/apiUsers";
import { getImage } from "../../api";

const TampilImage = () => {
    const [image,setImage] = useState(null);

    const isiImage = () => {
        GetUserByLogin().then((value) => {
            setImage(getImage(value.image_profile));
        });
    }

    return (
        <>
            <Button
                onClick={() => isiImage()}
            >
                isiImage
            </Button>
            {image? (
                <img src={image} alt="" />
            ) : (

                null
            )}
        </>
    );
}

export default TampilImage;