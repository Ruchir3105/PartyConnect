import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//User model
const User = new Schema({
    email: { type: String, unique: true },
    password: String
})
//event model
const Event = new Schema({
    name: String,
    Date: String,
    Venue: String,
    eventImage: {
        data: Buffer,
        contentType: String
    },
    categories: String,
})
//registeration model
const Registration = new Schema({
    name: String,
    phone: {
        type: String,
        required: false,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },
    registeredAt : {
        type : Date,
        default: Date.now
    }
     
})

const UserModel = mongoose.model("User", User);
const EventModel = mongoose.model("Event", Event);
const RegistrationModel = mongoose.model("Registration", Registration);

export { UserModel, EventModel, RegistrationModel};