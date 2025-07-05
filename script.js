document.addEventListener('DOMContentLoaded', () => {

    //--------TYPE WRITER EFFECT ON TITLE -------
    const text = "See the weather!";
    const speed = 100; // Adjust typing speed in milliseconds
    const typeWriterElement = document.getElementById("typewriter-text")

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typeWriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
        /*} else {
            //when typing is done, we want to remove the cursor 
            typeWriterElement.style.borderRight = "none"
        }*/
    }

    //when window is loaded start typeWriter 
    typeWriter();

    //----SCROLL REVEAL---
    window.sr = ScrollReveal();
    sr.reveal('#home #forcast');


    //---WEATHER API CALLS--
    const cityForm = document.getElementById("zip-form")
    const cityInput = document.getElementById("zip-code")
    const weatherResultDiv = document.getElementById("weather-result")
    const apiKey = "75b1ea9e6b9542be952204716250107"


    //Listen for the form to be submitted 
    cityForm.addEventListener("submit", function (event) {
        // Prevent the form from actually submitting and reloading the page
        event.preventDefault();

        // Get the value from the input field *at the moment of submission*
        const city = cityInput.value;

        // Call the function to get the weather data
        getWeather(city);

    });

    async function getWeather(city) {
        const apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city + "&aqi=no"

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Handle errors like an invalid zip code
                weatherResultDiv.innerHTML = "Could not find weather for that location. Please try again.";
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Correctly access the data based on the WeatherAPI.com structure
            const locationName = data.location.name;
            const temperature = data.current.temp_f; // Use temp_f for Fahrenheit
            const description = data.current.condition.text;
            const weatherIcon = data.current.condition.icon;

            // Use backticks (`) for template literals to display variables
            weatherResultDiv.innerHTML = `
                <h2>Weather in ${locationName}</h2>
                <img src="https:${weatherIcon}" alt="${description}">
                <p><strong>Temperature:</strong> ${temperature}°F</p>
                <p><strong>Condition:</strong> ${description}</p>
            `;

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    }

});


