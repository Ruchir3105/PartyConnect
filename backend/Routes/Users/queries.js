import express from "express";
import bodyParser from "body-parser";
import {UserModel} from "../../Database/db.js"

const router = express.Router();
router.use(bodyParser.json());

router.post("/signup", async (req,res)=>{
    //1. body se jo teri email aur pass fetch
    const { email, password } = req.body;
    
    console.log(email, password);
    
    //2, check kr email and pass
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
    }
    try {
        // 3. check for existing user
        console.log("Reaching here");
        
        const existingUser = await UserModel.findOne({ email });
        console.log("Existing user: ", existingUser);
        
        if (existingUser) {
            res.status(409).json({ message: "User with this email already exists" }); 
        }
        const newUser = await UserModel.create({
            email: email,
            password: password
        })
    
        res.status(201).json({ message: "User created successfully" }); 
        } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "An error occurred during signup" }); 
        }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (password === user.password) {
            // 🔐 Create a session
            req.session.user = {
                id: user._id,
                email: user.email
            };
            console.log(req.session.user);
            
            return res.status(200).json({ message: "Sign in successful", user: req.session.user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.error("Error during sign in:", error);
        res.status(500).json({ message: "An error occurred during sign in" });
    }
});

router.get("/session", (req, res) => {
    console.log("session checking");
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Could not log out" });
        } else {
            res.clearCookie("connect.sid"); // default session cookie name
            return res.status(200).json({ message: "Logged out successfully" });
        }
    });
});

export default router;