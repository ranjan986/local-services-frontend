import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, token } = useAuth();
  const [image, setImage] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUpload = async () => {
    if (!image) return alert("Select an image first");

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("https://local-services-backend.onrender.com/api/profile/upload-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    setUpdatedUser(res.data);
    alert("Profile picture updated");
  };

  return (
    <div>
      <h2>My Profile</h2>
      <img src={updatedUser.profilePic} alt="Profile" width={150} height={150} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Profile Picture</button>
    </div>
  );
};

export default Profile;
