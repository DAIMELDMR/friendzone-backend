const express = require('express');
const cors = require('cors')

const authRoutes = require('./routes/auth.js')

const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))