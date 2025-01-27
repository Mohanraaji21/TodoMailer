const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config(); 
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
