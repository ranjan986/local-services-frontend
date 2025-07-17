import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./ProviderDashboard.css";

const ProviderDashboard = () => {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", category: "", price: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchServices = () => {
    axios.get("https://local-services-backend.onrender.com/api/services/all").then((res) => {
      const myServices = res.data.filter((s) => s.provider?._id === JSON.parse(localStorage.getItem("user"))._id);
      setServices(myServices);
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) data.append("image", image);

    await axios.post("https://local-services-backend.onrender.com/api/services/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    fetchServices();
    setFormData({ title: "", description: "", category: "", price: "" });
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`https://local-services-backend.onrender.com/api/services/delete/${id}`, {
        headers: { Authorization: token },
      });
      fetchServices();
    }
  };

  const handleEdit = (service) => {
    setEditMode(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) data.append("image", image);

    await axios.put(`https://local-services-backend.onrender.com/api/services/update/${editMode}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    setEditMode(null);
    setFormData({ title: "", description: "", category: "", price: "" });
    setImage(null);
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="provider-dashboard" >
      <h2>Provider Dashboard</h2>

      <h3>{editMode ? "Edit Service" : "Add Service"}</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
        {editMode && <button onClick={() => setEditMode(null)}>Cancel</button>}
      </form>

      <h3>Your Services</h3>
      {services.map((s) => (
        <div key={s._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <img src={s.image} alt={s.title} style={{ width: "200px" }} />
          <h4>{s.title}</h4>
          <p>{s.description}</p>
          <p>₹{s.price}</p>
          <button onClick={() => handleEdit(s)} id="edit">Edit</button>
          <button onClick={() => handleDelete(s._id)} id="delete">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProviderDashboard;
