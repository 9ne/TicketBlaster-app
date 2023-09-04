import React, { useState } from 'react';
import './outlet-create-event-style/create-event.css';

export const CreateEvent = () =>  {
  const [previewImage, setPreviewImage] = useState(null);
  const [select, setSelect] = useState('');


  const handleChangeValueSelect = (e) => {
    setSelect(e.target.value);
  };

  const handlePreviewImage = (e) => {
    if (e.target.value && e.target.value[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
  };

  return(
    <div id="create-event">
      <form method="post" className="create-event-form">
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
                src={previewImage}             className="create-event-image-preview-art"
              />
              <p className="create-event-preview-image-inner-text">Event Photo</p>
            </div>
          </div>
          <div className="create-event-flex-right">
            <div className="create-event-flex-right-options-flex">
              <div className="create-event-flex-right-options-flex-top-left">
                <label htmlFor="category" className="create-event-category-title">Category</label>
                <select 
                  name="events" 
                  id="events" 
                  className="select-category"
                  value={select}
                  onChange={handleChangeValueSelect}
                >
                  <option value=""></option>
                  <option value="musical-concerts">Musical Concerts</option>
                  <option value="stand-up-comedy">Stand Up Comedy</option>
                </select>
                <i class="fa-solid fa-caret-down arrow-1"></i>
              </div>
              <div className="create-event-flex-right-options-flex-top-right">
                <label htmlFor="date" className="create-event-date-title">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  id="date"  
                  defaultValue={null}
                  className="create-event-date"
                />
              </div>
              <i class="fa-solid fa-caret-down arrow-2"></i>
            </div>
            <div className="create-event-flex-right-textarea">
              <label htmlFor="eventDetails" className="create-event-event-details-title">Event Details</label>
              <textarea name="eventDetails" id="eventDetails" className="create-event-textarea"></textarea>
            </div>
            <div className="create-event-flex-right-ticket-price">
              <label htmlFor="ticketPrice" className="create-event-ticket-price-title">Ticket Price</label>
              <input type="text" name="ticketPrice" id="ticketPrice" className="create-event-ticket-price-input"/>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}