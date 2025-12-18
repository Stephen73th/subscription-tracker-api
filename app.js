// console.log('Heard on localhost:3000')

import express from 'express';
import { PORT } from './config/env.js';
import databaseConnect from './database/mongodb.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API')
    console.log(res)
});

app.listen(PORT, async () =>{
    console.log('Subscription Tracker is running');

    await databaseConnect()

});

export default app;


