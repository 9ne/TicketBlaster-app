import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import './outlet-user-details-style/outlet-user-details.css';
import axios from 'axios';

export const OutletUserDetails = () => {
  const [passwordForm, setPasswordForm] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isDefaultImg, setIsDefaultImg] = useState(true);
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const { userDefaultImg, userName, updateDefaultImg, userId, userEmail } = useContext(AuthContext);

  const imageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const nameChange = (e) => {
    setNewName(e.target.value);
  };

  const emailChange = (e) => {
    setNewEmail(e.target.value);
  };


  
  const newUserDataUpload = async () => {
    try {
      const formData = new FormData();

      if (newImage) {
        formData.append('image', newImage);
      };
      if (newName) {
        formData.append('name', newName);
      }
      if (newEmail) {
        formData.append('email', newEmail);
      }

      if (formData.has('image') || formData.has('name') || formData.has('email')) {
        const response = await axios.patch(`/api/v1/user/update-user/${userId}`, formData);
        
        if (response.status === 204) {
          if (formData.has('image')) {
            updateDefaultImg(response.data.image, false);
            setIsDefaultImg(false);
          }
        }
      }

    } catch(err) {
      console.log(err);
    }
  };

  const newUserPassword = async () => {
    try {
      await axios.patch(`/api/v1/user/update-user/${userId}`, {
        password: password
      });
    } catch(err) {  
      console.log(err);
    }
  };


  const togglePasswordForm = () => {
    setPasswordForm(!passwordForm);
  };

  return (
    <div id="outlet-user-details">
      <div className="outlet-user-details">
        <div className="outlet-user-details-flex">
          <form className="form">
            <div className="outlet-user-details-flex-top">
              <img 
              className="outlet-user-details-image" 
              src={isDefaultImg ? `/images/${userDefaultImg}` : `/${userDefaultImg}` }
              alt={userName}
              />
              <div className="outlet-user-details-flex-top-inner">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={newName || userName}
                  onChange={nameChange}
                />
              </div>
            </div>
            <div className="outlet-user-details-flex-bottom">
              <div className="outlet-user-details-flex-bottom-left">
                <input 
                  type="file" 
                  name="image" 
                  id="file" 
                  className="input-image"
                  onChange={imageChange}
                />
                <label htmlFor="file" className="label-file">Upload Avatar</label>
              </div>
              <div className="outlet-user-details-flex-bottom-right">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={newEmail || userEmail}
                  onChange={emailChange}
                />
              </div>
            </div>
            <button 
            type="submit" 
            className="submit-bottom-form-top"
            onClick={newUserDataUpload}
            >
            Submit</button>
          </form>
        </div>
        <div className="outlet-users-password-form">
            <div className="outlet-users-password-flex-top">
              <h2 className="outlet-users-password-flex-top-title">Password</h2>
              <Link 
              className="outlet-users-password-toggle-button"
              onClick={togglePasswordForm}
              >Change Password</Link>
            </div>
            { passwordForm && (
              <form>
              <div className="outlet-users-password-flex-bottom">
                <div className="outlet-users-password-flex-bottom-top">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="outlet-users-password-flex-bottom-bottom">
                  <label htmlFor="re-password">Re-type Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="re-password" 
                    required
                    value={reTypePassword}
                    onChange={(e) => setReTypePassword(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="submit-bottom-form-bottom"
                onClick={newUserPassword}
              >Submit</button>
            </form>
            )}
        </div>
      </div>
    </div>
  )
};