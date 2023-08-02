import React, { useState, useEffect, useContext }  from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './one-event-style/one-event-style.css';
import logo from '../logo/logo-dark.png';

export const Event = () => {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const { id } = useParams();
  const { loginSuccess, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const getEvent = async () => {
    try {
      const response = await axios.get(`/api/v1/event/get-one-event/${id}`);
      setEvent(response.data.data.event);
      setCategory(response.data.data.event.category)
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events') 
      setEvents(response.data.data.event);
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getEvent();
      getEvents();
    }
  }, [id]);

  const relatedEvents = events.filter((events) => events.category === category && events._id !== id);

  console.log(relatedEvents);

  const addToCartPopUp = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
    };
  };


  return (
    <div id="event">
      <div className="event">
        <div className="event-header">
          <h2 className="heading-event">{event.name}</h2>
          <p className="date-event">{event.date}</p>
          <p className="date-location">{event.location}</p>
        </div>
        <div className="event-content-flex">
          <div className="event-content-left">
            <img src={`/images/${event.image}`} alt={`${event.name}`} className="
            one-event-image" />
          </div>
          <div className="event-content-right">
            <div className="space-content">
              <p className="event-about">About</p>
              <p className="event-description">{event.eventDetails}</p>
            </div>
            <div className="event-tickets">
              <div className="tickets-align">
                <div className="tickets-flex-w-price">
                  <p className="tickets">Tickets</p>
                  <p className="tickets-price">{event.price}</p>
                </div>
                <div className="tickets-form">
                  <form method="post" id="count">
                    <input type="number" name="count" id="count" placeholder="1" />
                    <button type="button" className="button-add" onClick={addToCartPopUp}>Add to cart</button>
                  </form>
                </div>
              </div>
            </div>
            {showPopUp && (
            <div className="popup">
              <div className="popup-buttons">
                <img src={logo} alt="logo" className="pop-up-logo" />
                <p className="pop-up-text">You are not logged in. Please log in or create an account to add items to your cart.</p>
                <button type="button" className="login-pop-up" onClick={() => navigate('/login')}>Log in</button>
                <button type="button" className="create-pop-up" onClick={() => navigate('/create-account')}>Create Account</button>
                <button type="button" className="pop-up-close" onClick={() => setShowPopUp(false)}><i class="fa-solid fa-x"></i></button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="related-acts">
        <div className="related">
          <h2 className="related-heading">Related Acts</h2>
        </div>
      </div>
      <div className="related-events">
        {relatedEvents && relatedEvents
          .map((relatedEvent, i) => {
            if (i >= 2) return null;
            return(
              <div className="related-events-flex" key={i}>
                <div className="related-event-flex-left">
                    <img src={`/images/${relatedEvent.image}`} alt={relatedEvent.name} className="related-event-image" />
                </div>
                <div className="related-event-flex-right">
                  <p className="related-event-name">{relatedEvent.name}</p>
                  <p className="related-event-date">{relatedEvent.date}</p>
                  <p className="related-event-details">{relatedEvent.eventDetails}</p>
                  <div className="related-event-location-tickets-flex">
                    <p className="related-event-location">{relatedEvent.location}</p>
                    <Link to={`/one-event/${relatedEvent._id}`} className="related-event-location-link">Get Tickets</Link>
                    </div>
                </div>
              </div>
            )
          })
          }
      </div>
    </div>
  )
};
