import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './purchase-complete-style/purchase-complete-style.css';
import logoDark from '../logo/logo-dark.png';
import qrImg from '../logo/qr.png';
import axios from 'axios';

export const PurchaseComplete = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [purchasedItemPopup, setPurchasedItemPopup] = useState(false);
  const [popupItemDetails, setPopupItemDetails] = useState(null);
  const { userId } = useContext(AuthContext);

  const popupPurchasedItemClose = () => {
    setPopupItemDetails(null);
    setPurchasedItemPopup(false);
  };

  const getRecentPurchasedTickets = async () => {
    try {
      const response = await axios.get(`/api/v1/ecommerce/get-latest-tickets/${userId}`);
      // console.log(response); 
      setPurchasedItems(response.data.data.mostLatestEvents);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentPurchasedTickets();
  }, [])

  const calculateTotalPrice = (ticket) => {
    const quantity = ticket.quantity;
    const price = ticket.event.price;
    const priceSplited = price.split('$');
    const priceNumber = Number(priceSplited[1]);
    return quantity * priceNumber;
  };

  return (
    <div id="purchase-complete">
      <h1 className="purchase-complete-title">Thank you for your purchase!</h1>
      {purchasedItems &&
        purchasedItems.map((purchasedItem, i) => {
          const totalPrice = calculateTotalPrice(purchasedItem);
          return(
            <div key={i} className="purchase-complete-flex">
              <div className="purchase-complete-flex-left">
                <img src={`/images/${purchasedItem.event.image}`} alt={purchasedItem.event.name} className="purchase-complete-image" />
                <div className="purchase-complete-flex-left-inner">
                  <h2 className="purchase-complete-event-title">{purchasedItem.event.name}</h2>
                  <p className="purchase-complete-event-date">
                    {new Date(purchasedItem.event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="purchase-complete-event-location">{purchasedItem.event.location}</p>
                </div>
              </div>
              <div className="purchase-complete-flex-right">
                <div className="purchase-complete-flex-right-inner-left">
                  <p className="purchase-complete-total-price">${totalPrice.toFixed(2)}</p>
                  <p className="purchase-complete-tickets-quantity">{purchasedItem.quantity} x {purchasedItem.event.price} USD</p>
                </div>
                <div className="purchase-complete-flex-right-inner-right">
                  <button 
                    className="purchased-item-print"
                    onClick={() => {
                      setPurchasedItemPopup(true);
                      setPopupItemDetails(purchasedItem);
                    }}
                    >
                      Print
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }
      {purchasedItemPopup && popupItemDetails && (
        <div className="purchased-complete-popup" onClick={popupPurchasedItemClose}>
          <div className="purchased-complete-popup-flex">
            <div className="purchased-complete-popup-flex-top">
              <div>
                <img src={logoDark} alt="logo-dark" className="purchased-complete-logo" />
              </div>
              <div>
                <img src={`/images/${popupItemDetails.event.image}`} alt={popupItemDetails.event.name} className="purchased-complete-popup-image" />
              </div>
            </div>
            <div className="purchased-complete-popup-flex-bottom">
              <div className="purchased-complete-flex-bottom-inner">
                <div className="purchased-complete-flex-bottom-inner-left">
                  <p className="purchased-complete-popup-title">{popupItemDetails.event.name}</p>
                  <p className="purchased-complete-popup-date">
                    {new Date(popupItemDetails.event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="purchased-complete-popup-location">{popupItemDetails.event.location}</p>
                </div>
                <img src={qrImg} alt="qr-code" className="image-qr" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}