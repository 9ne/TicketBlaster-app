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
              <img src={`/images/${events[0].image}`} alt={events[0].name}  className='image-hero'/>
              <div className="inside-hero-img-content">
                <div className="inside-hero-img-left">
                  <h2 className="hero-heading">{events[0].name}</h2>
                  <div className="inside-hero-img-left-flex">
                    <p className="hero-date">{events[0].date},</p>
                    <p>{events[0].location}</p>
                  </div>
                </div>
                <div className="inside-hero-img-right">
                  <Link to={`/one-event/${events[0]._id}`} className="get-tickets-btn-hero">Get Tickets</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="events-main">
        <div className="events">
          <h2 className="events-heading">Musical Concerts</h2>
          <div>
            {events && events
              .filter(event => event.category === 'Musical Concert')
              .slice(1)
              .map((event, i) => {
                if (i >= 5) return null;
                return(
                  <div key={i} className="event-flex">
                    <div className="event-flex-left">
                      <img src={`/images/${event.image}`} alt={event.name} className="event-image" />
                    </div>
                    <div className="event-flex-right">
                      <p className="event-name">{event.name}</p>
                      <p className="event-date">{event.date}</p>
                      <p className="event-details">{event.eventDetails}</p>
                      <div className="event-location-tickets-flex">
                        <p className='event-location'>{event.location}</p>
                        <Link to={`/one-event/${event._id}`} className="event-location-link">Get Tickets</Link>
                      </div>
                    </div>
                  </div>
                )
              })
              }
          </div>
          <Link to="/musical-concerts" className="link-to-all-events">See All Musical Concerts</Link>
        </div>
        <div className="events">
          <h2 className="events-heading">Stand-up Comedy</h2>
          <div>
            {events && events
              .filter(event => event.category === 'Stand-up Comedy')
              .slice(1)
              .map((event, i) => {
                if (i >= 5) return null;
                return(
                  <div key={i} className="event-flex">
                    <div className="event-flex-left">
                      <img src={`/images/${event.image}`} alt={event.name} className="event-image" />
                    </div>
                    <div className="event-flex-right">
                      <p className="event-name">{event.name}</p>
                      <p className="event-date">{event.date}</p>
                      <p className="event-details">{event.eventDetails}</p>
                      <div className="event-location-tickets-flex">
                        <p className='event-location'>{event.location}</p>
                        <Link to={`/one-event/${event._id}`} className="event-location-link">Get Tickets</Link>
                      </div>
                    </div>
                  </div>
                )
              })
              }
          </div>
          <Link to="/stand-up-comedy" className="link-to-all-events">See All Stand-up Comedy Shows</Link>
        </div>
        
      </div>
    </div>
  )
};