import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './event-style/events-style.css';

export const Events = () => {

  const [events, setEvents] = useState([]);

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
    getEvents();
  }, []);

  return (
    <div id="Events">
      <div className="events-hero">
        {events && events.length > 0 && (
          <div className="event-hero">
            <div className="event-hero-content">
              <img src={`/images/${events[0].image}`} alt="image-hero"  className='image-hero'/>
              <div className="inside-hero-img-content">
                <div className="inside-hero-img-left">
                  <h2 className="hero-heading">{events[0].name}</h2>
                  <div className="inside-hero-img-left-flex">
                    <p className="hero-date">{events[0].date},</p>
                    <p>{events[0].location}</p>
                  </div>
                </div>
                <div className="inside-hero-img-right">
                  <Link to='/' className="get-tickets-btn-hero">Get Tickets</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};