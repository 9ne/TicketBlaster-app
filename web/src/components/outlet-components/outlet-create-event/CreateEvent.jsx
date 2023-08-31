import React, { useState } from 'react';
import './outlet-create-event-style/create-event.css';

export const CreateEvent = () =>  {
  const [previewImage, setPreviewImage] = useState(null);

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
                htmlFor="image" 
                id="file" 
                className="create-event-label-file"
              >
                Upload Event Art
              </label>
              <input 
                type="file" 
                className="input-upload-event-art"
                onChange={handlePreviewImage}
                />

            </div>
            {  <img src={previewImage} alt="preview"/>}
          </div>
          <div className="create-event-flex-right"></div>
        </div>
      </form>
    </div>
  )
}