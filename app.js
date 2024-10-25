// Function to fetch the user's location
function fetchLocation() {
    fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => {
            const location = data.city; // Get the city from the response
            fetchWeatherData(location); // Fetch weather data for the location
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            document.getElementById('weatherContainer').innerHTML = '<p>Error fetching location data.</p>';
        });
}

// Function to fetch weather data for the specified location
function fetchWeatherData(location) {
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found for the specified location.');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherContainer').innerHTML = '<p>Error fetching weather data.</p>';
        });
}

// Function to display the weather data
function displayWeatherData(data) {
    const currentWeather = data.currentConditions; // Get current weather conditions
    const temperature = currentWeather.temp; // Current temperature
    const conditions = currentWeather.conditions; // Weather conditions
    const precipitation = currentWeather.precip; // Precipitation percentage
    const date = new Date(); // Current date and time

    // Format date and time
    const options = { weekday: 'long ', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Display the data
    const weatherHTML = `
        <div>
           
            <p> ${temperature} °C</p>
            <p>${formattedDate}</p>
            <p>${conditions}</p>
            <p>Perc-${precipitation} %</p>
        </div>
    `;

    document.getElementById('weatherContainer').innerHTML = weatherHTML;
}

// Call the function to fetch location data
fetchLocation();





















function fetchWeatherData() {
    fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => {
            const location = data.city; 
            getWeather(location);
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            document.getElementById('forecastContainer').innerHTML = '';
            document.getElementById('Today-Highlights').innerHTML = '';
            document.getElementById('currentWeather').innerHTML = '<p>Error fetching location data.</p>';
            // document.getElementById('weatherContainer').innerHTML = '<p>Error fetching location data.</p>';
        });
}


function getWeather(location) {
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found or API limit exceeded.');
            }
            return response.json();
        })
        .then(data => {
            
            // Display upcoming days using a for loop
            let upcomingDaysHTML = '<h2></h2>';
            for (let i = 0; i < 7; i++) {
                const day = data.days[i]; // Get the forecast for the next i-th day
                const dayName = getDayName(day.datetime); // Get the day name from the datetime
                upcomingDaysHTML += `
                    <div class="forecast-card">
                        <p>${dayName}</p>
                        <p> ${day.temp} °C</p>
                    </div>
                `;
            }


            



            document.getElementById('forecastContainer').innerHTML = upcomingDaysHTML;


            // Display current weather

            const todayHighLights = `
            
            <h2>Today's HighLights</h2>
            
            `;

            document.getElementById('Today-Highlights').innerHTML = todayHighLights;

            const currentWeather = data.currentConditions;

            // Current day weather
            const currentWeatherHTML = `
                    
                    <div class="forecast-card todayshighlights">
                        <p>UV Index</p> 
                        <p> ${currentWeather.uvindex}</p> 
                        <p> Moderate</p> 
                    </div>
                    <div class="forecast-card todayshighlights">
                        <p>Wind Status</p> 
                        <p>${currentWeather.windspeed} </p> 
                        <p>km/h</p> 
                    </div>
                    <div class="forecast-card todayshighlights">
                        <p>Sunrise & Sunset</p> 
                        <p>${currentWeather.sunrise}</p> 
                        <p>${currentWeather.sunset}</p>
                    </div>
                    <div class="forecast-card todayshighlights">
                        <p>Humidity</p> 
                        <p> ${currentWeather.humidity} </p> 
                        <p>High</p> 
                    </div>
                    <div class="forecast-card todayshighlights">
                        <p>Visibility</p> 
                        <p>${currentWeather.visibility} </p> 
                        <p>Clear Air</p> 
                    </div>
                    <div class="forecast-card todayshighlights">
                        <p>Air Quality</p> 
                        <p> ${currentWeather.winddir} </p> 
                        <p> Hazardous</p> 
                    </div>
                
            `;
          
            document.getElementById('currentWeather').innerHTML = currentWeatherHTML;

           
        })

        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('forecastContainer').innerHTML = '';
            document.getElementById('Today-Highlights').innerHTML = '';
            document.getElementById('currentWeather').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

// Function to get the day name from a date string
function getDayName(dateString) {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}


// Function to get the current day's name
function getCurrentDayName() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return days[today.getDay()];
}



// Call the function to fetch weather data on page load
fetchWeatherData();