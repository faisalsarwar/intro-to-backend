import express from 'express';

const app = express(); // Creating an express application instance

app.use(express.json());


// import routes
import userRouter from './routes/user.routes.js';

// routes declaration 
app.use("/api/v1/users", userRouter);


// exmaple route:  http://localhost:4000:/api/v1/users/register



export default app; // Exporting the app instance for use in other modules
