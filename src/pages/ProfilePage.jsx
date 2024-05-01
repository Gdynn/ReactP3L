import React from "react";
import "./css/Profile.css";
import FormProfile from "../components/forms/FormProfile";

const Profile = () => {
  return (
    <body className="main">
      <div className="row pler mt-3">
        <div className="container cont">
          <FormProfile />
        </div>
      </div>
    </body>
  );
};

export default Profile;