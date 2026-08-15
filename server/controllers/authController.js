import User from "../models/User.js"
import bcrypt from "bcryptjs"
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields: username, email, and password"
            })
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "The user is already exist"
            })
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
                username: newUser.username,
                email: newUser.email
            }
        });


    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({
            message: "Server error occurred during registration"
        });
    }
}
