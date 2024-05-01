import React, { useEffect } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { useState } from "react";
import { GetUserById, GetUserByLogin, UpdateProfile } from "../../api/apiUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FaImage, FaPlusSquare } from "react-icons/fa";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getImage } from "../../api";

const FormProfile = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [image, setImage] = useState();
  const [pushImage, setPushImage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    try {
      GetUserById(sessionStorage.getItem("id_user")).then((value) => {
        setUser(value);
        setImage(getImage(value.image_profile));
        //   const url = URL.createObjectURL(getImage(value.image_profile));
        console.log("ini urlnya :" + getImage(value.image_profile));

        setEditedUser({ ...value });
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(true);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async () => {
    try {
      console.log(`isi image ${pushImage}`);
      editedUser.image_profile = pushImage;
      await UpdateProfile(editedUser);
        
      setUser({ ...editedUser });
      GetUserByLogin().then((value) => {
        setImage(getImage(value.image_profile));
      });
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("sdf");
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImage = (event) => {
    console.log(`isi image : ${event.target.files[0]}`);

    setPushImage(event.target.files[0]);
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Form>
      <div className="row mt-3">
        <div className="col-3">
          <div className="col d-flex justify-content-center">
            <div className="pt-4 img-preview text-center position-relative mb-3">
              {image ? (
                <img
                  src={image}
                  className="rounded-circle img-profile "
                  style={{width: '80%', aspectRatio: "1/1"}}
                  alt="Profile Image"
                />
                
              ) : (
                <FontAwesomeIcon
                  className="mt-2"
                  icon={faUser}
                  size="6x"
                />
              )}
              {isEditMode? (
                <Button
                variant="primary"
                type="button"
                disabled={isPending}
                size="sm"
                className="mt-3"
                onClick={() => document.getElementById("pushImage").click()}
              >    Edit Photo
                </Button>
              ):(
                null
              )}
              
            
              

              <input
                type="file"
                name="pushImage"
                id="pushImage"
                className="d-none"
                onChange={handleImage}
                accept="image/*"
              />
            </div>
          </div>
          <div className="mt-5 d-flex justify-content-center">
            {!isEditMode && (
              <button
                type="button"
                className="btn btn-primary ms-2"
                id="editBtn"
                onClick={handleEditClick}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Porfile
              </button>
            )}
            {isEditMode && (
              <>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="cancelBtn"
                  onClick={handleCancelClick}
                >
                  <FontAwesomeIcon icon={faBackward} />
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  id="saveBtn"
                  onClick={handleSaveClick}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Simpan
                </button>
              </>
            )}
          </div>
        </div>
        <div className="col-9">
          <h3 className="d-flex mb-3">
            <strong>My Profile</strong>
          </h3>
          <div className="row">
            <div className="col-6">
              <label htmlFor="nama" className="form-label d-flex">
                <strong>Nama</strong>
              </label>
              <Form.Control
                type="text"
                name="fullname"
                id="id"
                value={editedUser.fullname}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label d-flex">
                <strong>Email</strong>
              </label>
              {/* <input type="text" name="email" id="email" className="form-control" value={editedUser.email} onChange={handleInputChange} disabled={!isEditMode} /> */}
              <Form.Control
                type="text"
                name="email"
                id="email"
                value={editedUser.email}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="telepon" className="form-label mt-3 d-flex">
                <strong>Nomor Telepon</strong>
              </label>
              {/* <input type="text" name="telepon" id="telepon" className="form-control" value={editedUser.no_telp} onChange={handleInputChange} disabled={!isEditMode} /> */}
              <Form.Control
                type="text"
                name="no_telp"
                id="no_telp"
                value={editedUser.no_telp}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-6">
              <label htmlFor="username" className="form-label mt-3 d-flex">
                <strong>Username</strong>
              </label>
              {/* <input type="text" name="username" id="username" className="form-control" value={editedUser.username} onChange={handleInputChange} disabled={!isEditMode} /> */}
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={editedUser.username}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <label htmlFor="alamat" className="form-label mt-3 d-flex">
            <strong>Alamat</strong>
          </label>
          {/* <textarea className="form-control" name="alamat" id="alamat" cols="10" rows="5" onChange={handleInputChange} disabled={!isEditMode}>{editedUser.alamat}</textarea> */}
          <Form.Control
            as="textarea"
            name="alamat"
            id="alamat"
            cols="10"
            rows="5"
            value={editedUser.alamat}
            onChange={handleInputChange}
            disabled={!isEditMode}
          />
        </div>
      </div>
   
    </Form>
  );
};
export default FormProfile;
