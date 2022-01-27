const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

//requiring the routes
const authRoutes = require('./routes/auth.js')

const app = express();
const PORT = process.env.PORT || 8000;

//requiring environment variables
require('dotenv').config()

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const twilioClient = require('twilio')(accountSid, authToken);

//middleware
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});


//twilio code
// app.post('/', (req, res) => {
//     const { message, user: sender, type, members } = req.body;
//     if (type === 'message.new') {
//         members
//             .filter((member) => member.user_id !== sender.id )
//             .forEach(({ user }) => {
//             if (!user.online) {
//                 twilioClient.messages.create({
//                     body: `You have new message from ${message.user.fullName} - ${message.text}`,
//                     messagingServiceSid: messagingServiceSid,
//                     to: user.phoneNumber
//                 })
//                     .then(() => console.log('Message sent!'))
//                     .catch((error) => console.log(error) )
//             }
//             })
//         return res.status(200).send('Message sent!');
//     }
//     return res.status(200).send('Not a new message request!');
// })

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))