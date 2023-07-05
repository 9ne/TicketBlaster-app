import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Events = () => {

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:10002/api/v1/get-all-events') 
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
    <div id='Events'>
      <div className="events-hero">
        
      </div>
      
    </div>
  )
};