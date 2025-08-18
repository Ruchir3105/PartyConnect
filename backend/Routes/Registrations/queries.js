import express from "express";
import bodyParser from "body-parser";
import { RegistrationModel } from "../../Database/db.js";

const router = express.Router();
router.use(bodyParser.json());

// Route to add a new registration
router.post("/add", async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        // Validate phone number format (optional)
        if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
            return res.status(400).json({ error: "Please enter a valid phone number" });
        }

        // Create a new registration
        const newRegistration = await RegistrationModel.create({
            name,
            phone,
            registeredAt: Date.now(),
        });

        console.log(`Registration for "${name}" added successfully`);
        res.status(200).json({ message: "Registration added successfully!", registration: newRegistration });
    } catch (error) {
        console.error("Error adding registration:", error);
        res.status(500).json({ error: "Error adding registration" });
    }
});

export default router;
