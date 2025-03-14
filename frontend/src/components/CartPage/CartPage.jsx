import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Подсчет общей суммы
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <p>{item.price} Сом x {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Итого:</strong> {totalAmount.toFixed(2)} Сом</p>
            <button className="checkout-button" onClick={clearCart}>Оформить заказ</button>
          </div>
        </>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
};

export default CartPage;