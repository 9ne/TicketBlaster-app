import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './update-event-style/update-event-style.css';

export const UpdateEvent = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [relatedActId, setRelatedActId] = useState('');
  const [eventData, setEventData] = useState({
    name: '',
    category: '',
    date: '',
    eventDetails: '',
    location: '',
    price: '',
    image: '',
    relatedActs: []
  });

  const navigate = useNavigate();

  // console.log('related act Id:', relatedActId);
  // console.log('allEvents:', allEvents);

  const handleNameChange = (e) => {
    setEventData({ ...eventData, name: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setEventData({ ...eventData, category: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      document.getElementById('date-error').innerText = 'Cannot select past time.';
    } else {
      document.getElementById('date-error').innerText = '';
    }
    setEventData({ ...eventData, date: e.target.value });
  };

  const formatedDate = eventData.date.split('T')[0];

  const handleEventDetailsChange = (e) => {
    setEventData({ ...eventData, eventDetails: e.target.value });
  };

  const handleLocationChange = (e) => {
    setEventData({ ...eventData, location: e.target.value });
  };

  const handleTicketPrice = (e) => {
    setEventData({ ...eventData, price: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEventData({ ...eventData, image: file }); 
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setEventData({ ...eventData }); 
      setImagePreview(null);
    }
  };

  const handleAddRelatedActs = async () => {
    if (!relatedActId) {
      // console.log('related act:', relatedActId);
      return;
    };
    try {
      const response = await axios.get(`/api/v1/event/get-one-event/${relatedActId}`)
      const relatedActData = response.data.data.event;

      if (!relatedActData) {
        // console.log('related act not found');
        return;
      };

      setEventData((prevEventData) => ({
        ...prevEventData,
        relatedActs: [...prevEventData.relatedActs, relatedActData]
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveRelatedActs = (relatedAct) => {
    setEventData({
      ...eventData,
      relatedActs: eventData.relatedActs.filter((act) => act !== relatedAct)
    });
  };

  const currEvent = async () => {
    try {
      const response = await axios.get(`/api/v1/event/get-one-event/${id}`);
      // console.log(response);
      setEventData(response.data.data.event);
    } catch (err) { 
      console.log(err);
    };
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      // console.log(response);
      setAllEvents(response.data.data.event);
    } catch (err) {
      console.log(err);
    };
  };

  const updateEvent = async () => {
    try {
      const formData = new FormData();
      if (eventData.name) {
        formData.append('name', eventData.name);
      };
      if (eventData.category) {
        formData.append('category', eventData.category);
      };
      if (eventData.date) {
        formData.append('date', eventData.date);
      };
      if (eventData.eventDetails) {
        formData.append('eventDetails', eventData.eventDetails);
      };
      if(eventData.location) {
        formData.append('location', eventData.location);
      };
      if(eventData.price) {
        formData.append('price', eventData.price);
      };
      if(eventData.image) {
        formData.append('image', eventData.image);
      };

      if (eventData.relatedActs.length > 0) {
        for (const relatedAct of eventData.relatedActs) {
          formData.append('relatedActs', relatedAct._id);
        };
      };

      if (
        formData.has('name') || 
        formData.has('category') || 
        formData.has('date') || 
        formData.has('eventDetails') || 
        formData.has('location') || 
        formData.has('price') || 
        formData.has('image') || 
        formData.has('relatedActs')
        ) {
        const response = await axios.patch(`/api/v1/event/update-event/${id}`, formData);
  
        if (response.status === 200) {
          navigate('/user/events');
          console.log('Event updated successfully:', response.data);
        } else {
          console.error('Failed to update event:', response.data.message);
        }
      }
      
    } catch(err) {
      console.log(err);
    };
  };


  useEffect(() => {
    currEvent()
    getAllEvents()
  }, []);

  return (
    <div id="update-event">
      <form method="post" encType="multipart/form-data" className="update-event-form">
        <div className="update-event-flex">
          <div className="update-event-flex-left">
            <label 
              htmlFor="event-name" 
              className="udate-event-name">
                Event Name
            </label>
            <input 
            type="text"
            className="input-update-event-name"
            value={eventData.name}
            onChange={handleNameChange}
            />
            <div className="update-event-flex-upload-image">
              <label 
                htmlFor="file"
                className="update-event-label-file"
                name="image"
                >
                  Upload Event Art
              </label>
              <input 
                type="file" 
                name="image" 
                id="file"
                className="update-event-input-file"
                onChange={handleImageChange}
              />
            </div>
            <div className="update-event-preview-image-inner">
              <img 
                src={imagePreview || `/images/${eventData.image}`} 
                className="update-event-image-preview-art"
                // alt="preview"
              />
              <p className="update-event-preview-image-inner-text">Event Photo</p>
            </div>
          </div>
          <div className="update-event-flex-right">
            <div className="update-event-flex-right-options-flex">
              <div className="update-event-flex-right-options-flex-top-left">
                <label 
                  name="category" 
                  className="update-event-category-title"
                  >
                    Category
                </label>
                <select 
                  name="category" 
                  id="category"
                  className="update-select-category"
                  value={eventData.category}
                  onChange={handleCategoryChange}
                  >
                  <option value=""></option>
                  <option value="Musical Concert">Musical Concert</option>
                  <option value="Stand-up Comedy">Stand Up Comedy</option>
                </select>
                <i className="fa-solid fa-caret-down update-arrow-1"></i>
              </div>
              <div className="update-event-flex-right-options-flex-top-right">
                <label 
                  name="date" 
                  className="update-event-date-title"
                  >
                    Date
                </label>
                <input 
                  type="date" 
                  name="date" 
                  id="date"
                  className="update-event-date"
                  value={formatedDate}
                  onChange={handleDateChange}
                   />
                  <p id="date-error" className="error-date-message"></p>
              </div>
              <i className="fa-solid fa-caret-down update-arrow-2"></i>
            </div>
            <div className="update-event-flex-right-textarea">
              <label 
                name="eventDetails" 
                className="update-event-details-title"
                >
                  Event Details
              </label>
              <textarea 
                name="eventDetails" 
                id="eventDetails" 
                className="update-event-textarea"
                value={eventData.eventDetails}
                onChange={handleEventDetailsChange}
                >
              </textarea>
            </div>
            <div className="update-event-flex-right-ticket-price-location">
              <div className="update-event-flex-right-ticket-price">
                <label 
                  name="price" 
                  className="update-event-ticket-price-title"
                  >
                    Ticket Price
                </label>
                <input 
                  type="text" 
                  name="price" 
                  id="price" 
                  className="update-event-ticket-price-input"
                  value={eventData.price}
                  onChange={handleTicketPrice}
                 />
              </div>
              <div className="update-event-flex-right-ticket-price">
                <label 
                  htmlFor="location" 
                  className="update-event-location-title">
                    Location
                </label>
                <input 
                  type="text" 
                  name="location" 
                  id="price" 
                  className="update-event-location-input"
                  value={eventData.location}
                  onChange={handleLocationChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="update-event-related-events">
          <h2 className="update-event-related-events-title">Related Events</h2>
          <div className="update-event-related-events-option">
            <div className="update-event-select-related-events">
              <select 
                name="categoryRelated" 
                id="categoryRelated" 
                className="update-event-related"
                value={relatedActId}
                onChange={(e) => setRelatedActId(e.target.value)}
                >
                <option value=""></option>
                {allEvents
                  .filter((event) => event.category === eventData.category && event._id !== id)
                  .map((relatedEvents, i) => {
                    return (
                      <option key={i} value={relatedEvents._id}>
                      {relatedEvents.name} - {new Date(relatedEvents.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {relatedEvents.location}
                    </option>
                    )
                  })
                }
              </select>
              <i className="fa-solid fa-caret-down arrow-3-update"></i>
            </div>
            <div className="button-update-related-add">
              <button 
                type="button"
                className="update-related-events-add-button"
                onClick={handleAddRelatedActs}
                >
                  Add
                </button>
            </div>
          </div>
          <div id="update-related-events">
            {eventData.relatedActs.map((relatedEventsCurr, i) => {
              const handleRemoveRelatedAct = () => {
                handleRemoveRelatedActs(relatedEventsCurr)
              };
              return(
              <div className="update-related-events-inner" key={i}>
                <div className="update-related-events-inner-flex">
                  <img 
                    src={`/images/${relatedEventsCurr.image}`} 
                    alt={relatedEventsCurr.name}
                    className="update-related-events-img"
                    />
                  <div className="update-related-events-flex-right">
                    <div className="update-related-events-flex-right-inner-top">
                      <p className="update-related-events-name">{relatedEventsCurr.name}</p>
                      <p className="update-related-events-date">
                      {new Date(relatedEventsCurr.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      </p>
                      <p className="update-related-events-location">{relatedEventsCurr.location}</p>
                    </div>
                    <div className="update-related-events-flex-right-inner-bottom">
                      <button 
                        type="button" 
                        className="update-remove-related-events-added-button"
                        onClick={handleRemoveRelatedAct}
                        >
                          Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )
            })
            }
          </div>
        </div>
        <button 
          className="update-save-event" 
          type="button"
          onClick={updateEvent}
          >
            Save
          </button>
      </form>
    </div>
  )
};