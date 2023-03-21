/* Global Variables */
// Personal API Key for OpenWeatherMap API, not to be shared :D
const apiKey = '51d6358b91a8237e1538c53efea749c2&units=imperial';

/* Create a new date instance dynamically with JS */
function checkDate() {
    let d = new Date();
    // Get full month name (e.g. "October"), better for internationalization
    let month = d.toLocaleString('default', { month: 'long' });
    let today = month + '.' + d.getDate() + '.' + d.getFullYear();
    // return the current date as {day monthName year}
    return today;
}

/* Retrieve temperature from OpenWeatherMap web API */
async function getTemp(key) {
    // Only US zip codes
    let zip = document.getElementById('zip').value;
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    let fetchUrl = baseURL + zip + ',us&appid=' + key;

    const request = await fetch(fetchUrl);
    try {
        const allData = await request.json();
        // return the temp in degrees Fahrenheit
        return allData.main.temp;

    } catch (error) {
        console.log("error", error);
    }
}

// Event listener to add function to HTML DOM button #generate
document.getElementById('generate').addEventListener('click', chainCalls);

/* Function to POST data */
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        })

    } catch (error) {
        console.log('Error: ', error)
    }
}

/* Function to GET Project Data */
async function retrieveData(url = '') {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const data = await request.json()
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to update the UI with the retrieved data from the server*/
async function updateUI() {
    // First, get data from the project endpoint
    const data = await retrieveData('/all');
    try {
        // update each DOM element with the corresponding data point
        // 'data.length - 1' gets the last element in the projectData array, which is the 'Most Recent Entry'
        document.getElementById('date').innerHTML = data[data.length - 1].date;
        document.getElementById('temp').innerHTML = Math.round(data[data.length - 1].temp) + ' ° F';
        document.getElementById('content').innerHTML = data[data.length - 1].feeling;

    } catch (error) {
        console.log("error", error);
    }
}

/* Function called by event listener on the #generate button */
async function chainCalls() {
    let IFeel = document.getElementById('feelings').value;
    let today = checkDate();
    let currentTemp = await getTemp(apiKey);

    // Send the data to the project endpoint
    postData('/add', { date: today, temp: currentTemp, feeling: IFeel })
        // then call the update UI function to populate the page with the respective data
        .then(updateUI());
}