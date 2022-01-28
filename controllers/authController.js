const { connect } = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto')

//requiring environment variables
require('dotenv').config()

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        //generating a random id
        const userId = crypto.randomBytes(16).toString('hex');

        //Establishing connection to the client
        const serverClient = stream.connect(api_key, api_secret, app_id);

        //hashing the password using 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating a token using the random id generated before
        const token = serverClient.createUserToken(userId)

        //sending back to the front end the created user with the new user id and the hashed password
        res.status(200).json({token, fullName, username, userId, phoneNumber, hashedPassword})

    } catch (error) {
        console.log(error.response.dat)
        res.status(500).json({ message: error });
     }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //Establishing connection to the client
        const serverClient = connect(api_key, api_secret, app_id);

        //creating instance of StreamChat
        const client = StreamChat.getInstance(api_key, api_secret);

        //get the desctructure user who match the username
        const { users } = await client.queryUsers({ name: username });

        //verifing if we have the user
        if (!users.length)
            return res.status(400).json({ message: 'User not found' });

        //if we got a user, comparing passwords
        const match = await bcrypt.compare(password, users[0].hashedPassword)

        //creating a token for the user using his user id
        const token = serverClient.createUserToken(users[0].id)

        //if match we send the user to the front end
        if (match) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id })
        //we send a message that the password is incorrect
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
     }
}

module.exports = {signup, login};