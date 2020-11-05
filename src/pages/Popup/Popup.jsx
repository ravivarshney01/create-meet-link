import React, { useState } from 'react';
import { useEffect } from 'react';
import './Popup.css';
import logo from '../../assets/img/meet.png';

const Popup = () => {
  const [authUser, setAuthUser] = useState(0);
  useEffect(() => {
    chrome.storage.local.get(['user'], (res) => {
      if (res.user) {
        setAuthUser(res.user);
      }
    });
  }, []);
  const handleAuthUserChange = (e) => {
    setAuthUser(e.target.value);
    chrome.storage.local.set({ user: e.target.value });
  };

  const createMeet = () => {
    chrome.runtime.sendMessage({ msg: 'create-meeting' });
  };
  return (
    <div className="app">
      <div className="app__header">
        <p className="app__header__title">Meet</p>
        <img src={logo} className="app__header__logo" alt="logo" />
      </div>
      <div className="app__form">
        <label htmlFor="auth" className="app__form__label">
          Auth User
        </label>
        <input
          id="auth"
          type="number"
          className="app__form__input"
          value={authUser}
          onChange={handleAuthUserChange}
        />
      </div>
      <button className="app__button" onClick={createMeet}>
        Create Meet
      </button>
    </div>
  );
};

export default Popup;
