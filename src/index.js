import './style.css';
import getWeather from './module';  
/* import getForecast from './module2'; */

const searchButton = document.getElementById('searchButton'); 


searchButton.addEventListener('click', getWeather);  

/* getForecast(); */