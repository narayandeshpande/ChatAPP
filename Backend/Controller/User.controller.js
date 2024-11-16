import { createTokenAndSaveCookie } from '../JWT/generateToken.js';
import User from '../Models/User.model.js';
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {

    const { fullname, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        //hashing the password
        const newPassword = await bcryptjs.hash(password, 10)
        const newUser = await new User({
            fullname,
            email,
            password: newPassword
        });
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User created successfully", user: {
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                }
            });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // console.log("hello");

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }


        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: "Login successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const logout = (req, res) => {
    try {
        // console.log(req.cookies.jwt);
        
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logout successfuly" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// fatching all user
export const allUsers = async (req, res) => {
    try {
        const logdinuser = req.user._id;
        // console.log(logdinuser);
        const filterusers = await User.find({ _id: { $ne: logdinuser } }).select("-password")
        res.status(200).json(filterusers)
    } catch (error) {
        console.log("hello" + error);
    }
}

