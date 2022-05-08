import express from 'express';
import cors from 'cors';
import Logger from './utils/logger';
import db from './config/db';
import { Auth, Booking, Event } from './api';

const PORT: string | number = process.env.PORT || 3002;

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})
);

app.use(cors());
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static('public'));
db.authenticate()
    .then(() => {
        Logger.info('Database connected.');
    })
    .catch((err: string) => {
        Logger.error('ERROR - Unable to connect to the database:', err);
    });

app.get('/', async (req, res) => {
    const tes = req.hostname;
    res.status(200).send({
        status: 'OK',
        message: 'Welcome',
        tes: tes
    });
});

//api
Auth(app);
Event(app);
Booking(app);

app.listen(PORT, () => {
    Logger.info('App is listening on port 3000!');
});
