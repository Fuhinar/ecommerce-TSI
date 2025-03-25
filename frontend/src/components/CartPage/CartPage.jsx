import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    const phone = '996228888013';

    const message = cartItems
      .map((item, idx) => {
        return `*Товар ${idx + 1}*
Название: ${item.title}
Цена: ${item.price} Сом
Кол-во: ${item.quantity}
${item.size ? `Размер: ${item.size}` : ''}
${item.logoPosition ? `Локация логотипа: ${item.logoPosition}` : ''}
`;
      })
      .join('\n');

    const finalMessage = `Здравствуйте! Я хочу оформить заказ через сайт WeaveArt:\n\n${message}\n*Итого:* ${totalAmount.toFixed(
      2
    )} Сом`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

    window.open(url, '_blank');
  };

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
                  <p className="cart-title">{item.title}</p>
                  <p>{item.price} Сом x {item.quantity}</p>
                  {item.size && <p>Размер: <strong>{item.size}</strong></p>}
                  {item.logoPosition && (
                    <p>Позиция логотипа: <strong>{item.logoPosition}</strong></p>
                  )}
                  <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Итого:</strong> {totalAmount.toFixed(2)} Сом</p>
            <div className="cart-actions">
              <button className="whatsapp-button" onClick={handleWhatsAppCheckout}>
                Отправить заказ в WhatsApp
              </button>
              <button className="clear-cart-button" onClick={clearCart}>
                Очистить корзину
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="empty-cart-message">Корзина пуста</p>
      )}
    </div>
  );
};

export default CartPage;
