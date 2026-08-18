import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields: username, email, and password"
            })
        }

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (userExists) {
            return res.status(400).json({
                message: userExists.email === email ? "The email is already registered" : "The username is already taken"
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save()

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });


    } catch (error) {
        console.error("Registration Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists with this email or username"
            });
        }
        res.status(500).json({
            message: "Server error occurred during registration"
        });
    }
}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = await req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Please provide valid email and password"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: "Login successfull",
            token,
            user: {
                id: user._id,
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }

}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user: {
                id: user._id,
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("GetMe Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


    