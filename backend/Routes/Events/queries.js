import multer from "multer";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { EventModel } from "../../Database/db.js";

const router = express.Router();
// Configure multer to handle image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.use(bodyParser.json());

router.post("/add", upload.single("eventImage"), async (req, res) => {
    try {
        const { name, Date, Venue, categories } = req.body;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: "Please upload an event image." });
        }

        console.log("File received:", {
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
        });

        // Read the file as a Buffer
        const imgBuffer = fs.readFileSync(file.path);

        // Create an event with image data stored as Buffer
        const newEvent = await EventModel.create({
            name,
            Date,
            Venue,
            eventImage: {
                data: imgBuffer,
                contentType: file.mimetype,
            },
            categories,
        });

        // Delete the temp file after saving to database
        fs.unlinkSync(file.path);

        console.log(
            `Event "${name}" created successfully with image (${imgBuffer.length} bytes)`
        );
        res.status(200).json({ message: "Event created successfully!" });
    } catch (error) {
        console.error("Error adding event: ", error);
        res.status(500).json({ error: "Error creating event" });
    }
});

router.get("/fetch", async (req, res) => {
    try {
        const events = await EventModel.find();
        console.log(`Found ${events.length} events`);

        // Convert event image buffer to base64
        const eventsWithImages = events.map((event) => {
            // Convert to plain JavaScript object if using Mongoose
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        res.status(200).json(eventsWithImages);
    } catch (error) {
        console.error("Error fetching events: ", error);
        res.status(500).json({ error: "Error fetching events" });
    }
});

router.get("/sports", async (req, res) => {
    try {
        // Query the database for events where the category is 'sports'
        const sportsEvents = await EventModel.find({ categories: "sports" });

        if (!sportsEvents || sportsEvents.length === 0) {
            return res.status(404).json({ message: "No sports events found" });
        }

        // Convert event image buffer to base64 for sports events
        const sportsEventsWithImages = sportsEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the sports events with images as the response
        res.status(200).json(sportsEventsWithImages);
    } catch (error) {
        console.error("Error fetching sports events:", error);
        res.status(500).json({ message: "Failed to fetch sports events" });
    }
});
//the route for arts page
router.get("/arts", async (req, res) => {
    try {
        // Query for 'arts' category events
        const artsEvents = await EventModel.find({ categories: "arts" });

        if (!artsEvents?.length) {
            return res.status(404).json({ message: "No arts events found" });
        }

        // Same image conversion logic as sports
        const artsEventsWithImages = artsEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
            /* ... reuse the exact same image processing code from sports route ... */
        });

        res.status(200).json(artsEventsWithImages);
    } catch (error) {
        console.error("Error fetching arts events:", error);
        res.status(500).json({ message: "Failed to fetch arts events" });
    }
});

//the route for cinema page
router.get("/cinema", async (req, res) => {
    try {
        // Query the database for events where the category is 'cinema'
        const cinemaEvents = await EventModel.find({ categories: "cinema" });

        if (!cinemaEvents || cinemaEvents.length === 0) {
            return res.status(404).json({ message: "No cinema events found" });
        }

        // Convert event image buffer to base64 for cinema events
        const cinemaEventsWithImages = cinemaEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the cinema events with images as the response
        res.status(200).json(cinemaEventsWithImages);
    } catch (error) {
        console.error("Error fetching cinema events:", error);
        res.status(500).json({ message: "Failed to fetch cinema events" });
    }
});

//route for comedy page
router.get("/comedy", async (req, res) => {
    try {
        // Query the database for events where the category is 'comedy'
        const comedyEvents = await EventModel.find({ categories: "comedy" });

        if (!comedyEvents || comedyEvents.length === 0) {
            return res.status(404).json({ message: "No comedy events found" });
        }

        // Convert event image buffer to base64 for comedy events
        const comedyEventsWithImages = comedyEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the comedy events with images as the response
        res.status(200).json(comedyEventsWithImages);
    } catch (error) {
        console.error("Error fetching comedy events:", error);
        res.status(500).json({ message: "Failed to fetch comedy events" });
    }
});


//rpute for education page

router.get("/education", async (req, res) => {
    try {
        // Query the database for events where the category is 'education'
        const educationEvents = await EventModel.find({ categories: "education" });

        if (!educationEvents || educationEvents.length === 0) {
            return res.status(404).json({ message: "No education events found" });
        }

        // Convert event image buffer to base64 for education events
        const educationEventsWithImages = educationEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the education events with images as the response
        res.status(200).json(educationEventsWithImages);
    } catch (error) {
        console.error("Error fetching education events:", error);
        res.status(500).json({ message: "Failed to fetch education events" });
    }
});

//food drink page routing
router.get("/fooddrink", async (req, res) => {
    try {
        // Query the database for events where the category is 'fooddrink'
        const foodDrinkEvents = await EventModel.find({ categories: "fooddrink" });

        if (!foodDrinkEvents || foodDrinkEvents.length === 0) {
            return res.status(404).json({ message: "No food & drink events found" });
        }

        // Convert event image buffer to base64 for fooddrink events
        const foodDrinkEventsWithImages = foodDrinkEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the food & drink events with images as the response
        res.status(200).json(foodDrinkEventsWithImages);
    } catch (error) {
        console.error("Error fetching food & drink events:", error);
        res.status(500).json({ message: "Failed to fetch food & drink events" });
    }
});

//gaming page routing
router.get("/gaming", async (req, res) => {
    try {
        // Query the database for events where the category is 'gaming'
        const gamingEvents = await EventModel.find({ categories: "gaming" });

        if (!gamingEvents || gamingEvents.length === 0) {
            return res.status(404).json({ message: "No gaming events found" });
        }

        // Convert event image buffer to base64 for gaming events
        const gamingEventsWithImages = gamingEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the gaming events with images as the response
        res.status(200).json(gamingEventsWithImages);
    } catch (error) {
        console.error("Error fetching gaming events:", error);
        res.status(500).json({ message: "Failed to fetch gaming events" });
    }
});

//music events routing
router.get("/music", async (req, res) => {
    try {
        // Query the database for events where the category is 'music'
        const musicEvents = await EventModel.find({ categories: "music" });

        if (!musicEvents || musicEvents.length === 0) {
            return res.status(404).json({ message: "No music events found" });
        }

        // Convert event image buffer to base64 for music events
        const musicEventsWithImages = musicEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the music events with images as the response
        res.status(200).json(musicEventsWithImages);
    } catch (error) {
        console.error("Error fetching music events:", error);
        res.status(500).json({ message: "Failed to fetch music events" });
    }
});


//photography page routing
router.get("/photography", async (req, res) => {
    try {
        // Query the database for events where the category is 'photography'
        const photographyEvents = await EventModel.find({ categories: "photography" });

        if (!photographyEvents || photographyEvents.length === 0) {
            return res.status(404).json({ message: "No photography events found" });
        }

        // Convert event image buffer to base64 for photography events
        const photographyEventsWithImages = photographyEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the photography events with images as the response
        res.status(200).json(photographyEventsWithImages);
    } catch (error) {
        console.error("Error fetching photography events:", error);
        res.status(500).json({ message: "Failed to fetch photography events" });
    }
});


//theatre events routing
router.get("/theatre", async (req, res) => {
    try {
        // Query the database for events where the category is 'theatre'
        const theatreEvents = await EventModel.find({ categories: "theatre" });

        if (!theatreEvents || theatreEvents.length === 0) {
            return res.status(404).json({ message: "No theatre events found" });
        }

        // Convert event image buffer to base64 for theatre events
        const theatreEventsWithImages = theatreEvents.map((event) => {
            const eventObj = event.toObject ? event.toObject() : event;

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Debug: Check what type of data we're getting
                    console.log(
                        `Event "${eventObj.name}" image data type:`,
                        Buffer.isBuffer(eventObj.eventImage.data)
                            ? "Buffer"
                            : typeof eventObj.eventImage.data,
                        "Length:",
                        eventObj.eventImage.data.length || 0
                    );

                    // Ensure we have a proper Buffer to work with
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    // Verify buffer has content
                    if (buffer.length === 0) {
                        console.error(`Empty buffer for event "${eventObj.name}"`);
                        throw new Error("Empty image buffer");
                    }

                    // Convert Buffer to base64 string
                    const base64String = buffer.toString("base64");

                    // Debug: Check if base64 conversion worked
                    console.log(
                        `Base64 string for "${eventObj.name}" - Length: ${base64String.length}`
                    );

                    // Ensure we have a valid content type or default to jpg
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";

                    // Create complete data URL
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                } else {
                    console.log(`Event "${eventObj.name}" has no image data`);
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                // Provide a placeholder for invalid images
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        // Send the theatre events with images as the response
        res.status(200).json(theatreEventsWithImages);
    } catch (error) {
        console.error("Error fetching theatre events:", error);
        res.status(500).json({ message: "Failed to fetch theatre events" });
    }
});


//fetch any random events 
router.get("/popular", async (req, res) => {
    try {
        // Get 4 random events from the database
        const popularEvents = await EventModel.aggregate([{ $sample: { size: 4 } }]);

        if (!popularEvents || popularEvents.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }

        // Process images similar to your other routes
        const eventsWithImages = popularEvents.map((event) => {
            const eventObj = event; // Aggregate doesn't have toObject()

            try {
                if (eventObj.eventImage && eventObj.eventImage.data) {
                    // Handle buffer conversion
                    const buffer = Buffer.isBuffer(eventObj.eventImage.data)
                        ? eventObj.eventImage.data
                        : Buffer.from(
                            eventObj.eventImage.data.buffer || eventObj.eventImage.data
                        );

                    if (buffer.length === 0) {
                        throw new Error("Empty image buffer");
                    }

                    const base64String = buffer.toString("base64");
                    const contentType = eventObj.eventImage.contentType || "image/jpeg";
                    eventObj.eventImage.data = `data:${contentType};base64,${base64String}`;
                }
            } catch (err) {
                console.error(
                    `Error processing image for event "${eventObj.name}":`,
                    err
                );
                eventObj.eventImage = {
                    data: null,
                    contentType: null,
                    isInvalid: true,
                };
            }

            return eventObj;
        });

        res.status(200).json(eventsWithImages);
    } catch (error) {
        console.error("Error fetching popular events:", error);
        res.status(500).json({ message: "Failed to fetch popular events" });
    }
});




export default router;
