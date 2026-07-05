const express= require('express');
const dotenv = require('dotenv');
const cors= require('cors');
const connectDB = require('./src/db');
const userRoutes = require('./src/routes/userRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const boardListRoutes = require('./src/routes/boardListRoutes');
const cardRoutes = require('./src/routes/cardRoutes');

dotenv.config() // loads the .env file

const app = express(); // Our express instance -  everything run through this

app.use(cors()); // Enable cross-origin requests from our frontend app
app.use(express.json());  //  Parse incoming request bodies as JSON

app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/boardlists', boardListRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
}).catch((err) => {
    console.error("MongoDB Connection Failed! Error details:", err);
});



