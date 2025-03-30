import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/orders/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile/");
      setProfile(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/profile/", profile);
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={profile.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="first_name"
            placeholder="Имя"
            value={profile.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={profile.last_name}
            onChange={handleInputChange}
          />
          <button type="submit">Сохранить</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Отмена
          </button>
        </form>
      ) : (
        <div>
          <p>Имя пользователя: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Имя: {profile.first_name}</p>
          <p>Фамилия: {profile.last_name}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </div>
      )}
    </div>
  );
};

export default Profile;