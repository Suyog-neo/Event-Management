import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventsReducer from './slices/eventsSlice';
import bookingsReducer from './slices/bookingsSlice';

<<<<<<< HEAD
=======

// load the auth data of user from localstorage 
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) return undefined;
    return { auth: JSON.parse(serializedState) };
  } catch (error) {
    console.log(error.message)
    return undefined;
  }
}



>>>>>>> 39081a035bd13aaade5ca62b2560bf5eb27dbd6b
export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    bookings: bookingsReducer,
  },
<<<<<<< HEAD
=======
  preloadedState: loadState()
});


// check user is login and save tokens 
store.subscribe(() => {
  const state = store.getState();
  if (state.auth.isAuthenticated) {
    localStorage.setItem('auth', JSON.stringify(state.auth));
  } else {
    localStorage.removeItem('auth');
    localStorage.removeItem('authToken');
  }
>>>>>>> 39081a035bd13aaade5ca62b2560bf5eb27dbd6b
});
