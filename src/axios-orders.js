import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-9bf37.firebaseio.com/'
});

export default instance;
