const User = require('../models/User');
const bcrypt = require('bcrypt');

//User SignUp
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //checking if the user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = new User({ username, email, password: hashedPassword });
        const newUser = await user.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Sorry, failed to sign up' });
    }
};

//user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check to see if the user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //check password 
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword) {
            return res.status(401).json({ error: 'Incorrect password'});
        }
        res.json({ message: 'Login successful!' })
    } catch(err) {
        console.error(err, 'login unsuccessful')
        res.status(500).json({ error: 'failed to login '});
    }
};

//get a user's details 
const findUser = async(req, res) => {
    try{
        const userId = req.params.id;

        //find by Id
        const user = await User.findById(userId);
        if(!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch(err) {
        res.status(500).json({ error: 'Cannot get user details' });
    }
};

module.exports = {
    signupUser,
    loginUser,
    findUser,
};
