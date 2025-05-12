/*jshint esversion: 8 */
function myApp() {
    'use strict';
    console.log('Hello, World!');
}

myApp();
// to enforce strict mode in JavaScript. had a problem with linting before that.
// Strict mode helps catch common coding bugs by throwing errors 
// for unsafe actions (like using undeclared variables).
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./models/db');
// linter had a problem with defining a variable we never use
// const {loadData} = require("./util/import-mongo/index");


const app = express();
app.use("*",cors());
const port = 3060;

// Connect to MongoDB; we just do this one time
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
})
    .catch((e) => console.error('Failed to connect to DB', e));


app.use(express.json());

// Route files
const authRoutes = require('./routes/authRoutes');
// Gift API Task 1: import the giftRoutes and store in a constant called giftroutes
const giftRoutes = require('./routes/giftRoutes');
// Search API Task 1: import the searchRoutes and store in a constant called searchRoutes
const searchRoutes = require('./routes/searchRoutes');

const pinoHttp = require('pino-http');
const logger = require('./logger');

app.use(pinoHttp({ logger }));

// Attach Routes to your Express app to handle routes 
app.use('/api/auth', authRoutes);
// Gift API Task 2: add the giftRoutes to the server by using the app.use() method.
app.use('/api/gifts', giftRoutes);

// Search API Task 2: add the searchRoutes to the server by using the app.use() method.
 // same for searchRoutes
app.use('/api/search', searchRoutes);


// Global Error Handler. next was never used, linter had a problem with that.
app.use((err, req, res, /*next*/) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/",(req,res)=>{
    res.send("Inside the server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


/* sample solution
    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const pinoLogger = require('./logger');

    const connectToDatabase = require('./models/db');
    const {loadData} = require("./util/import-mongo/index");


    const app = express();
    app.use("*",cors());
    const port = 3060;

    // Connect to MongoDB; we just do this one time
    connectToDatabase().then(() => {
        pinoLogger.info('Connected to DB');
    })
        .catch((e) => console.error('Failed to connect to DB', e));


    app.use(express.json());

    // Route files
    // Gift API Task 1: import the giftRoutes and store in a constant called giftroutes
    const giftRoutes = require('./routes/giftRoutes');

    // Search API Task 1: import the searchRoutes and store in a constant called searchRoutes
    //{{insert code here}}


    const pinoHttp = require('pino-http');
    const logger = require('./logger');

    app.use(pinoHttp({ logger }));

    // Use Routes
    // Gift API Task 2: add the giftRoutes to the server by using the app.use() method.
    app.use('/api/gifts', giftRoutes);

    // Search API Task 2: add the searchRoutes to the server by using the app.use() method.
    //{{insert code here}}


    // Global Error Handler
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });

    app.get("/",(req,res)=>{
        res.send("Inside the server")
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    */
