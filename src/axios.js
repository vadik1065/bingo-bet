import axios from 'axios';
let state = 0;
var url = 'https://admin.bingo.bet';
// var url = 'https://test.bingo.bet'; // тестовый сервер
axios.interceptors.response.use(response => {
  if (response.data.message === "Unauthenticated.") {
    console.log("Unauthenticated.");
  }
  return response;
}, function (error, response) {

    if (error.response.status === 401 && state === 0) {
      state = 1;
      alert("Your session is expired. Please log in.")
      setTimeout(() => {
        localStorage.clear();
        window.location.href="/home";
      }, 2000);
    }
   return Promise.reject(error);
 });

export default url
