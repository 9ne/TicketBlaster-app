import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './checkout-style/checkout-style.css';
import axios from 'axios';

export const Checkout = () => {
  const [checkoutTickets, setCheckoutTickets] = useState([]);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardNoError, setCardNoError] = useState(false);
  const [expires, setExpires] = useState('');
  const [expiresError, setExpiresError] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  // const validateName = fullName.trim().split(' ').length >= 2;
  // const validateCardNo = cardNo.length === 16;

  const validateFullName = () => {
    if (fullName.trim().split(' ').length >= 2) {
      setFullNameError(false);
    } else {
      setFullNameError(true);
    };
  };

  const handleFullName = (e) => {
    const value = e.target.value;
    setFullName(value);
    validateFullName(value);
  };

  const validateCardNo = () => {
    if(cardNo.length === 16 && !isNaN(cardNo)) {
      setCardNoError(false);
    } else {
      setCardNoError(true);
    };
  };

  const handleCardNo = (e) => {
    const value = e.target.value;
    setCardNo(value);
    validateCardNo(value);
    if (!value.includes(' ') && value.length === 16 && !isNaN(value)) {
      setCardNoError(false);
    };
  };

  const validateExpires = () => {
    const enteredDate = new Date(expires);
    if(!isNaN(enteredDate) && enteredDate > Date.now()) {
      setExpiresError(false);
    } else {
      setExpiresError(true);
    }
  };

  const handleExpires = (e) => {
    const value = e.target.value;
    setExpires(value);
    validateExpires(value);

    if (new Date(value) > Date.now()) {
      setExpiresError(false);
    } else {
      setExpiresError(true);
    }
  };

  const validatePin = () => {
    if (pin.length === 3 && !isNaN(pin)) {
      setPinError(false);
    } else {
      setPinError(true);
    };
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    setPin(value);
    validatePin(value);
    if (!value.includes(' ') && value.length === 3 && !isNaN(value)) {
      setPinError(false);
    };
  };

  const checkOut = async () => {
    try {
      const response = await axios.get(`/api/v1/ecommerce/get-tickets-user/${userId}`);
      // console.log(response);
      setCheckoutTickets(response.data.data.ticket.tickets);
    } catch(err) {
      console.log(err);
    };
  };

  const payNow = async () => {
    try {
      const payload = {
        userId: userId
      }
      await axios.post(`/api/v1/ecommerce/process-payment/`, payload);
      navigate('/purchase-complete');

    } catch(err) {
      console.log(err);
    }
  };

  const calculateTotalPrice = (ticket) => {
    const quantity = ticket.quantity;
    const price = ticket.event.price;
    const priceSplited = price.split('$');
    const priceNumber = Number(priceSplited[1]);
    return quantity * priceNumber;
  }

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    checkoutTickets.forEach((checkoutTicket) => {
      const totalPrice = calculateTotalPrice(checkoutTicket);
      totalAmount += totalPrice;
    });
    return totalAmount;
  };

  const totalAmountForAllTickets = calculateTotalAmount();

  

  useEffect(() => {
    checkOut();
  }, [])

  return(
    <div id="checkout">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-flex-content-form">
        <div className="checkout-flex">
          {checkoutTickets && 
            checkoutTickets.map((checkoutTicket, i) => {
              const totalPrice = calculateTotalPrice(checkoutTicket);
              return(
                <div key={i} className="checkout-flex-left">
                  <div className="checkout-flex-left-content">
                    <div className="checkout-flex-left-inner">
                      <img src={`/images/${checkoutTicket.event.image}`} alt={checkoutTicket.event.name} className="checkout-image" />
                      <div className="checkout-flex-left-inner-right">
                        <h2 className="checkout-flex-ticket-title">{checkoutTicket.event.name}</h2>
                        <p className="checkout-flex-ticket-date">
                          {new Date(checkoutTicket.event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                        </p>
                        <p className="checkout-flex-ticket-location">{checkoutTicket.event.location}</p>
                      </div>
                    </div>
                    <div className="checkout-flex-right-inner">
                      <p className="checkout-flex-total-price">${totalPrice.toFixed(2)} USD</p>
                      <div className="checkout-flex-tickets-quantity">{checkoutTicket.quantity} x  {checkoutTicket.event.price} USD</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
         <div className="check-out-bottom-inner">
            <p className="checkout-total-bottom-price">Total:</p>
            <p className="checkout-total-bottom-total-price">${totalAmountForAllTickets.toFixed(2)} USD</p>
        </div>
        </div>
        <div className="checkout-flex-right">
            <form className="checkout-form">
              <div className="checkout-form-name">
                <label name="name">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={fullName}
                  onChange={handleFullName}
                  />
                  { fullNameError &&
                    <p className="full-name-error">Please enter a valid full name.</p>
                  }
              </div>
              <div className="checkout-form-card">
                <label name="card">Card No.</label>
                <input 
                  type="text" 
                  name="card" 
                  id="card"
                  value={cardNo}
                  onChange={handleCardNo}
                  />
                  { cardNoError &&
                    <p className="card-no-error">Please enter a valid credit card number.</p>
                  }
              </div>
              <div className="checkout-form-expires">
                <label name="expires">Expires</label>
                <input 
                  type="date" 
                  name="expires" 
                  id="expires"
                  value={expires}
                  onChange={handleExpires}
                  className="input-date"
                  />
                  { expiresError && 
                    <p className="expires-error">Please enter a valid date for the card.</p>
                  }
                <i className="fa-solid fa-caret-down arrow-2"></i>
              </div>
              <div className="checkout-form-pin">
                <label name="pin">Pin</label>
                <input 
                  type="text" 
                  name="pin" 
                  id="pin"
                  value={pin}
                  onChange={handlePinChange}
                  />
                  { pinError &&
                    <p className="pin-error">Please enter a 3-digit pin.</p>
                  }
              </div>
            </form>
          </div>
      </div>
      <div className="checkout-buttons-flex">
        <div className="checkout-back-button-container">
          <Link to='/shopping-cart' className="checkout-back-button">Back</Link>
        </div>
        <div className="checkout-container">
            <button className="checkout-pay-button" type="button" onClick={payNow}>Pay Now</button>
        </div>
      </div>
    </div>
  )
}

