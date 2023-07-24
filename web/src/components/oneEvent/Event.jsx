import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './one-event-style/one-event-style.css';

export const Event = () => {
  const [event, setEvent] = useState([]);
  const { id } = useParams();

  const getEvent = async () => {
    try {
      const response = await axios.get(`/api/v1/event/get-one-event/${id}`);
      setEvent(response.data.data.event);
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) getEvent();
  }, [id]);

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
                    <button type="submit" className="button-add">Add to cart</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};