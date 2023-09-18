import express from 'express';
import apiRouter from './routes/router';
import bodyParser from 'body-parser';

// express server + port
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Main router
app.use(apiRouter);

// Listen to port
app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});