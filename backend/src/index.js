import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './route/index';

let app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectDB();

// listening port
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(
        `listening on port ${port}: server running http://localhost:${port}`
    );
});
