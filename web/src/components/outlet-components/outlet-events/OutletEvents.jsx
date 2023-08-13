import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './outlet-events-style/outlet-events-style.css';
import axios from 'axios';

export const OutletEvents = () => {
  const [events, setEvents] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const getEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      setEvents(response.data.data.event);
    } catch(err) {
      console.log(err);
    }
  };

  const deleteEventPopUp = () => {
    setShowPopUp(!showPopUp);
  };

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div id="outlet-events">
      <div className="events-admin">
        {events && events
          .map((event, i) => {
            return(
            <div key={i} className="events-admin-flex">
              <div className="events-admin-flex-left">
                <img src={`/images/${event.image}`} alt={event.name} className="events-admin-image" />
                <div className="events-admin-flex-left-content">
                  <p className="events-admin-name">{event.name}</p>
                  <div className="events-admin-flex-left-content-date-location">
                    <p className="events-admin-date">{event.date}</p>
                    <p className="events-admin-location">{event.location}</p>
                  </div>
                </div>
              </div>
              <div className="events-admin-flex-right">
                <Link className="event-admin-delete-btn" onClick={deleteEventPopUp}>Delete Event</Link>
              </div>
            </div> 
            )
          })
        }
      </div>
      {showPopUp && (
        <div className="popup-admin">
          <h2 className="popup-admin-title">Are you sure?</h2>
          <p className="popup-admin-text">You are about to delete an event from the system. Please proceed with caution.</p>
          <div className="popup-admin-flex">
            <Link className="popup-cancel" onClick={() => setShowPopUp(false)}>Cancel</Link>
            <Link className="popup-delete-event-btn">Delete Event</Link>
          </div>
        </div>
      )}
    </div>
  )
};