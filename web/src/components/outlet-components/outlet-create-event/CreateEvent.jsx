import React, { useEffect, useState } from 'react';
import './outlet-create-event-style/create-event.css';
import axios from 'axios';

export const CreateEvent = () =>  {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEventToAdd, setSelectedEventToAdd] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    name: '',
    category: '',
    date: '',
    eventDetails: '',
    price: '',
    relatedActs: [],
    image: ''
  });

  // console.log(eventData);

  const handleAddEvent = () => {
    if (selectedEventToAdd) {
      if (relatedEvents.length < 2) {
        if (!relatedEvents.find((event) => event._id === selectedEventToAdd._id)) {
          setRelatedEvents([...relatedEvents, selectedEventToAdd]);
        } 
      }
    }
  };

  // console.log(relatedEvents);
  // console.log(selectedEventToAdd);

  const handleRmoveEvent = (remove) => {
    const updatedEvents = [...relatedEvents];
    updatedEvents.splice(remove, 1);
    setRelatedEvents(updatedEvents);
  };

  const handleAddingEvent = (e) => {
    console.log('handleAddingEvent called');
    const eventName = e.target.value;
    const eventToAdd = events.find((event) => event.name === eventName);
    console.log('eventToAdd:', eventToAdd);
    setEventData({
      ...eventData,
      relatedActs: [...eventData.relatedActs, eventToAdd]
    });
    setSelectedEventToAdd(eventToAdd);
  };

  const handleChangeValueSelect = (e) => {
    setSelectedCategory(e.target.value);
    setEventData({...eventData, category: e.target.value});
  };

  const handlePreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
  };

  const allEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      setEvents(response.data.data.event);

    } catch(err) {
      console.log(err);
    };
  };

  const createEvent = async () => {
    try {
      console.log(eventData);
      const response = await axios.post('/api/v1/event/create-event', eventData);
      console.log('Response:', response.data);
      console.log('succesfully created event');
    } catch(err) {
      console.log('error:', err);
      console.log('error response', err.response);
    }
  };
  

  useEffect(() => {
    allEvents();
  }, []);

  return(
    <div id="create-event">
      <form method="post" encType="multipart/form-data" className="create-event-form">
        <div className="create-event-flex">
          <div className="create-event-flex-left">
            <label 
              htmlFor="event-name" 
              className="label-event-name">
                Event Name
            </label>
            <input 
              type="text" 
              className="input-create-event-name"
              value={eventData.name}
              onChange={(e) => setEventData({...eventData, name: e.target.value})}
            />
            <div className="create-event-flex-upload-image">
              <label 
                htmlFor="file" 
                className="create-event-label-file"
              >
                Upload Event Art
              </label>
              <input 
                type="file"
                name="image" 
                id="file"
                className="input-upload-event-art"
                onChange={handlePreviewImage}
                />
            </div>
            <div className="create-event-preview-image-inner">
              <img 
                src={previewImage} 
                className="create-event-image-preview-art"
                // alt="preview"
              />
              <p className="create-event-preview-image-inner-text">Event Photo</p>
            </div>
          </div>
          <div className="create-event-flex-right">
            <div className="create-event-flex-right-options-flex">
              <div className="create-event-flex-right-options-flex-top-left">
                <label name="category" className="create-event-category-title">Category</label>
                <select 
                  name="category" 
                  id="category" 
                  className="select-category"
                  value={selectedCategory}
                  onChange={handleChangeValueSelect}
                >
                  <option value=""></option>
                  <option value="Musical Concert">Musical Concert</option>
                  <option value="Stand-up Comedy">Stand Up Comedy</option>
                </select>
                <i className="fa-solid fa-caret-down arrow-1"></i>
              </div>
              <div className="create-event-flex-right-options-flex-top-right">
                <label name="date" className="create-event-date-title">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  id="date"  
                  value={eventData.date}
                  onChange={(e) => setEventData({...eventData, date: e.target.value})}
                  className="create-event-date"
                />
              </div>
              <i className="fa-solid fa-caret-down arrow-2"></i>
            </div>
            <div className="create-event-flex-right-textarea">
              <label 
                name="eventDetails" 
                className="create-event-event-details-title"
                >
                  Event Details
                </label>
              <textarea 
                name="eventDetails" 
                id="eventDetails" 
                value={eventData.eventDetails}
                onChange={(e) => setEventData({...eventData, eventDetails: e.target.value})}
                className="create-event-textarea">
              </textarea>
            </div>
            <div className="create-event-flex-right-ticket-price">
              <label 
                htmlFor="price" 
                className="create-event-ticket-price-title">
                  Ticket Price
              </label>
              <input 
                type="text" 
                name="price" 
                id="price" 
                className="create-event-ticket-price-input"
                value={eventData.price}
                onChange={(e) => setEventData({...eventData, price: e.target.value})}
              />
            </div>
          </div>
        </div>
        <div className="related-events">
          <h2 className="related-events-title">Related Events</h2>
            <div className="related-events-option">
              <div className="select-related-events">
                <select 
                  name="categoryRelated" 
                  id="categoryRelated"
                  className="select-related"
                  onChange={handleAddingEvent}
                  value={selectedEventToAdd ? selectedEventToAdd.name : ''}
                  >
                  <option value=""></option>
                  {selectedCategory !== '' && events
                    .filter((event) => event.category === selectedCategory)
                    .map((event, i) => {
                      return(
                        <option key={i} value={event.name}>
                          {event.name} - {event.date} - {event.location}
                        </option>
                      )
                    })  
                  }
                </select>
                {selectedCategory === '' && (
                  <p className="no-Category">No category selected. Please chose a category.</p>
                )}
                <i className="fa-solid fa-caret-down arrow-3"></i>
              </div>
              <div className="button-related-add">
                <button type="button" className="related-events-add-button" onClick={handleAddEvent}>Add</button>
                {relatedEvents.length === 2 ? (
                  <p className="cant-add-more-events">You can't add more than two events.</p>
                ) : relatedEvents.find(event => event._id === selectedEventToAdd._id) ? (
                  <p className="cant-add-same-events">You can't add the same event twice.</p>
                ) : null}
              </div>
            </div>
            <div id="related-events">
              {relatedEvents.map((event, i) => {
                return(
                  <div className="related-events" key={i}>
                    <div className="related-events-flex">
                      <img src={`/images/${event.image}`} alt="" className="related-events-img" />
                      <div className="related-events-flex-right">
                        <div className="related-events-flex-right-inner-top">
                          <p className="related-events-name">{event.name}</p>
                          <p className="related-events-date">{event.date}</p>
                          <p className="related-events-location">{event.location}</p>
                        </div>
                        <div className="related-events-flex-right-inner-bottom">
                          <button type="button" className="remove-related-event-added-button" onClick={() => handleRmoveEvent(i)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
        </div>
        <button className="save-create-event" type="button" onClick={createEvent}>Save</button>
      </form>
    </div>
  )
}