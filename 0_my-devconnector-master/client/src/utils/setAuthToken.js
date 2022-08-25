import axios from 'axios';
// ? if there is token, we will make global header
// ? so that in every http API
// ? we dont need to add x-auth-token header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
