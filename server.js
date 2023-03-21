/* Empty JS object (array) to act as endpoint for all routes */
let projectData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const cors = require('cors');
app.use(cors());

/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Initialize the main project folder*/
app.use(express.static('website'));

/* Setting up and running the server*/
const port = 8080;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server running on http://localhost:${port}/`);
};

// GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route
app.post('/add', (req, res) => {
  projectData.push(req.body);
  console.log(projectData)
});
