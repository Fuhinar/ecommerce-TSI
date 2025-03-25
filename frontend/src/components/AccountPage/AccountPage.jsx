import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './AccountPage.css';
import { AuthContext } from '../../context/AuthContext';

export default function AccountPage() {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get('/api/orders/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error('Ошибка получения заказов:', err))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <div className="account-page">
      <h2>👋 Привет, {user?.username || 'Пользователь'}!</h2>

      <h3>🛒 Ваши заказы:</h3>
      {loading ? (
        <p>Загрузка...</p>
      ) : orders.length === 0 ? (
        <p>У вас пока нет заказов.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Заказ #{order.id}</strong> — {order.status}
              <br />
              Сумма: {order.total_price} сом
              <br />
              Дата: {new Date(order.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
